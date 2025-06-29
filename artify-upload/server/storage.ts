import { users, artworks, ownerships, transferRequests, scanLogs, type User, type InsertUser, type Artwork, type InsertArtwork, type UpdateArtwork, type Ownership, type InsertOwnership, type TransferRequest, type InsertTransferRequest, type ScanLog, type InsertScanLog } from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";
import bcrypt from "bcrypt";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Artwork methods
  getArtwork(id: number): Promise<Artwork | undefined>;
  getArtworkByQrCode(qrCode: string): Promise<Artwork | undefined>;
  getAllArtworks(): Promise<Artwork[]>;
  getUserArtworks(userId: number): Promise<Artwork[]>;
  createArtwork(artwork: InsertArtwork): Promise<Artwork>;
  updateArtwork(id: number, artwork: UpdateArtwork): Promise<Artwork | undefined>;

  // Ownership methods
  getArtworkOwnerships(artworkId: number): Promise<Ownership[]>;
  getCurrentOwnership(artworkId: number): Promise<Ownership | undefined>;
  createOwnership(ownership: InsertOwnership): Promise<Ownership>;
  updateOwnershipStatus(artworkId: number, isCurrentOwner: boolean): Promise<void>;

  // Transfer methods
  getTransferRequest(transferCode: string): Promise<TransferRequest | undefined>;
  createTransferRequest(transfer: InsertTransferRequest): Promise<TransferRequest>;
  confirmTransferRequest(transferCode: string): Promise<TransferRequest | undefined>;
  getPendingTransfers(): Promise<TransferRequest[]>;

  // Scan logs
  createScanLog(scanLog: InsertScanLog): Promise<ScanLog>;
  getArtworkScans(artworkId: number): Promise<ScanLog[]>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    // Skip sample data initialization for production deployment
    console.log("DatabaseStorage initialized for production deployment");
  }
  
  private async initializeSampleData() {
    try {
      // Check if users already exist
      const existingUsers = await db.select().from(users).limit(1);
      if (existingUsers.length > 0) {
        return; // Data already exists
      }

      // Create sample users with properly hashed passwords
      const hashedPassword = await bcrypt.hash('password123', 10);
      
      const admin = await this.createUser({
        email: "admin@artify.com",
        username: "admin",
        password: hashedPassword,
        isAdmin: true,
      });
      
      const artist = await this.createUser({
        email: "artist@demo.com", 
        username: "marina_artist",
        password: hashedPassword,
        isAdmin: false,
      });
      
      const collector = await this.createUser({
        email: "collector@example.com",
        username: "art_collector",
        password: hashedPassword,
        isAdmin: false,
      });
      
      // Create sample artworks
      const artwork1 = await this.createArtwork({
        title: "Digital Harmony",
        artist: "Marina Chen",
        year: 2023,
        medium: "Digital Art on Canvas",
        dimensions: "60 x 40 cm",
        description: "A stunning blend of traditional and digital techniques exploring the harmony between technology and nature.",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
        isVerified: true,
      });

      const artwork2 = await this.createArtwork({
        title: "Abstract Emotions",
        artist: "Marina Chen",
        year: 2023,
        medium: "Oil on Canvas",
        dimensions: "80 x 60 cm",
        description: "An expressive piece that captures the complexity of human emotions through abstract forms and vibrant colors.",
        imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400",
        isVerified: true,
      });

      // Update artworks with QR codes after creation
      await this.updateArtwork(artwork1.id, { qrCode: "QR001" });
      await this.updateArtwork(artwork2.id, { qrCode: "QR002" });

      // Create initial ownerships (artist owns their works)
      await this.createOwnership({
        artworkId: artwork1.id,
        ownerId: artist.id,
        ownerName: artist.username,
        ownerType: "Artist",
        acquisitionDate: new Date(),
        acquisitionDetails: "Original creation",
        isCurrentOwner: true,
      });

      await this.createOwnership({
        artworkId: artwork2.id,
        ownerId: artist.id,
        ownerName: artist.username,
        ownerType: "Artist",
        acquisitionDate: new Date(),
        acquisitionDetails: "Original creation",
        isCurrentOwner: true,
      });

    } catch (error) {
      console.error("Error initializing sample data:", error);
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    console.log("🔵 Creating user in Supabase database:", { 
      email: insertUser.email, 
      username: insertUser.username,
      isAdmin: insertUser.isAdmin 
    });
    
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
      
    console.log("✅ User successfully created in Supabase with ID:", user.id);
    return user;
  }

  async getArtwork(id: number): Promise<Artwork | undefined> {
    const [artwork] = await db.select().from(artworks).where(eq(artworks.id, id));
    return artwork || undefined;
  }

  async getArtworkByQrCode(qrCode: string): Promise<Artwork | undefined> {
    const [artwork] = await db.select().from(artworks).where(eq(artworks.qrCode, qrCode));
    return artwork || undefined;
  }

  async getAllArtworks(): Promise<Artwork[]> {
    return await db.select().from(artworks);
  }

  async getUserArtworks(userId: number): Promise<Artwork[]> {
    // Get artworks that the user currently owns
    const userOwnerships = await db
      .select()
      .from(ownerships)
      .where(and(eq(ownerships.ownerId, userId), eq(ownerships.isCurrentOwner, true)));
    
    const artworkIds = userOwnerships.map(ownership => ownership.artworkId);
    
    if (artworkIds.length === 0) {
      return [];
    }

    // Use SQL IN operator through raw query or individual queries
    const userArtworks: Artwork[] = [];
    for (const artworkId of artworkIds) {
      const artwork = await this.getArtwork(artworkId);
      if (artwork) {
        userArtworks.push(artwork);
      }
    }
    
    return userArtworks;
  }

  async createArtwork(insertArtwork: InsertArtwork): Promise<Artwork> {
    const [artwork] = await db
      .insert(artworks)
      .values(insertArtwork)
      .returning();
    return artwork;
  }

  async updateArtwork(id: number, updateData: UpdateArtwork): Promise<Artwork | undefined> {
    const [artwork] = await db
      .update(artworks)
      .set(updateData)
      .where(eq(artworks.id, id))
      .returning();
    return artwork || undefined;
  }

  async getArtworkOwnerships(artworkId: number): Promise<Ownership[]> {
    return await db
      .select()
      .from(ownerships)
      .where(eq(ownerships.artworkId, artworkId))
      .orderBy(desc(ownerships.createdAt));
  }

  async getCurrentOwnership(artworkId: number): Promise<Ownership | undefined> {
    const [ownership] = await db
      .select()
      .from(ownerships)
      .where(and(eq(ownerships.artworkId, artworkId), eq(ownerships.isCurrentOwner, true)));
    return ownership || undefined;
  }

  async createOwnership(insertOwnership: InsertOwnership): Promise<Ownership> {
    const [ownership] = await db
      .insert(ownerships)
      .values(insertOwnership)
      .returning();
    return ownership;
  }

  async updateOwnershipStatus(artworkId: number, isCurrentOwner: boolean): Promise<void> {
    await db
      .update(ownerships)
      .set({ isCurrentOwner })
      .where(eq(ownerships.artworkId, artworkId));
  }

  async getTransferRequest(transferCode: string): Promise<TransferRequest | undefined> {
    const [transfer] = await db
      .select()
      .from(transferRequests)
      .where(eq(transferRequests.transferCode, transferCode));
    return transfer || undefined;
  }

  async createTransferRequest(insertTransfer: InsertTransferRequest): Promise<TransferRequest> {
    const [transfer] = await db
      .insert(transferRequests)
      .values(insertTransfer)
      .returning();
    return transfer;
  }

  async confirmTransferRequest(transferCode: string): Promise<TransferRequest | undefined> {
    const [transfer] = await db
      .update(transferRequests)
      .set({ 
        status: "confirmed",
        confirmedAt: new Date(),
      })
      .where(eq(transferRequests.transferCode, transferCode))
      .returning();
    return transfer || undefined;
  }

  async getPendingTransfers(): Promise<TransferRequest[]> {
    return await db
      .select()
      .from(transferRequests)
      .where(eq(transferRequests.status, "pending"));
  }

  async createScanLog(insertScanLog: InsertScanLog): Promise<ScanLog> {
    const [scanLog] = await db
      .insert(scanLogs)
      .values(insertScanLog)
      .returning();
    return scanLog;
  }

  async getArtworkScans(artworkId: number): Promise<ScanLog[]> {
    return await db
      .select()
      .from(scanLogs)
      .where(eq(scanLogs.artworkId, artworkId))
      .orderBy(desc(scanLogs.scannedAt));
  }
}

export const storage = new DatabaseStorage();