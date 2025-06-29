import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertArtworkSchema, insertOwnershipSchema, insertTransferRequestSchema, insertScanLogSchema } from "@shared/schema";
import bcrypt from "bcrypt";

// Simple session store for demo (in production, use proper session store)
const sessions = new Map<string, any>();

// Middleware to check authentication
const requireAuth = (req: any, res: any, next: any) => {
  const sessionId = req.headers.authorization?.replace('Bearer ', '');
  if (!sessionId || !sessions.has(sessionId)) {
    return res.status(401).json({ message: "Authentication required" });
  }
  req.user = sessions.get(sessionId);
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      console.log("🟡 Frontend registration request received:", { 
        email: req.body.email, 
        username: req.body.username 
      });
      
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      console.log("🔍 Checking if user exists in Supabase...");
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        console.log("❌ User already exists in database");
        return res.status(400).json({ message: "User already exists with this email" });
      }

      // Hash password
      console.log("🔐 Hashing password...");
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      console.log("💾 Sending user data to Supabase database...");
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword,
      });

      console.log("🎉 Registration complete! User stored in Supabase with ID:", user.id);
      res.status(201).json({ 
        message: "User created successfully",
        user: { id: user.id, email: user.email, username: user.username }
      });
    } catch (error) {
      console.log("❌ Registration error:", error.message);
      res.status(400).json({ message: "Invalid user data", error: error.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Create session
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessions.set(sessionId, user);

      res.json({
        message: "Login successful",
        user: { id: user.id, email: user.email, username: user.username, isAdmin: user.isAdmin },
        sessionId
      });
    } catch (error) {
      res.status(400).json({ message: "Login failed", error: error.message });
    }
  });

  // Artwork routes
  app.get("/api/artworks", async (req, res) => {
    try {
      const artworks = await storage.getAllArtworks();
      res.json(artworks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch artworks", error: error.message });
    }
  });

  // Get user's artworks
  app.get("/api/users/me/artworks", requireAuth, async (req: any, res) => {
    try {
      const userArtworks = await storage.getUserArtworks(req.user.id);
      res.json(userArtworks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user artworks", error: error.message });
    }
  });

  app.get("/api/artworks/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const artwork = await storage.getArtwork(id);
      
      if (!artwork) {
        return res.status(404).json({ message: "Artwork not found" });
      }

      // Get ownership history
      const ownerships = await storage.getArtworkOwnerships(id);
      const currentOwnership = await storage.getCurrentOwnership(id);

      res.json({
        artwork,
        ownerships,
        currentOwnership,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch artwork", error: error.message });
    }
  });

  app.post("/api/artworks", async (req, res) => {
    try {
      const artworkData = insertArtworkSchema.parse(req.body);
      const artwork = await storage.createArtwork(artworkData);
      
      res.status(201).json(artwork);
    } catch (error) {
      res.status(400).json({ message: "Invalid artwork data", error: error.message });
    }
  });

  app.get("/api/qr/:qrCode", async (req, res) => {
    try {
      const { qrCode } = req.params;
      const artwork = await storage.getArtworkByQrCode(qrCode);
      
      if (!artwork) {
        return res.status(404).json({ message: "Artwork not found" });
      }

      res.json({ artworkId: artwork.id });
    } catch (error) {
      res.status(500).json({ message: "Failed to process QR code", error: error.message });
    }
  });

  // QR code scanning route with redirect logic
  app.get("/qr/:qrCode", async (req, res) => {
    try {
      const { qrCode } = req.params;
      const artwork = await storage.getArtworkByQrCode(qrCode);
      
      if (!artwork) {
        // If artwork not found, redirect to register
        return res.redirect("/register");
      }

      // Log the scan
      await storage.createScanLog({
        artworkId: artwork.id,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent') || null,
        scannedBy: null, // Could be populated if user is logged in
      });

      // Redirect to artwork page
      res.redirect(`/artwork/${artwork.id}`);
    } catch (error) {
      console.error("QR scan error:", error);
      res.redirect("/register");
    }
  });

  // Ownership routes
  app.post("/api/ownerships", async (req, res) => {
    try {
      const ownershipData = insertOwnershipSchema.parse(req.body);
      
      // Set previous ownerships as not current
      await storage.updateOwnershipStatus(ownershipData.artworkId, false);
      
      const ownership = await storage.createOwnership({
        ...ownershipData,
        isCurrentOwner: true,
      });
      
      res.status(201).json(ownership);
    } catch (error) {
      res.status(400).json({ message: "Invalid ownership data", error: error.message });
    }
  });

  // Transfer routes
  app.post("/api/transfers", async (req, res) => {
    try {
      const transferData = insertTransferRequestSchema.parse(req.body);
      
      // Generate unique transfer code
      const transferCode = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      const transfer = await storage.createTransferRequest({
        ...transferData,
        transferCode,
      });
      
      res.status(201).json(transfer);
    } catch (error) {
      res.status(400).json({ message: "Invalid transfer data", error: error.message });
    }
  });

  app.get("/api/transfers/:transferCode", async (req, res) => {
    try {
      const { transferCode } = req.params;
      const transfer = await storage.getTransferRequest(transferCode);
      
      if (!transfer) {
        return res.status(404).json({ message: "Transfer request not found" });
      }

      // Get artwork and ownership details
      const artwork = await storage.getArtwork(transfer.artworkId);
      const currentOwnership = await storage.getCurrentOwnership(transfer.artworkId);
      
      res.json({
        transfer,
        artwork,
        currentOwnership,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transfer", error: error.message });
    }
  });

  app.post("/api/transfers/:transferCode/confirm", async (req, res) => {
    try {
      const { transferCode } = req.params;
      const transfer = await storage.confirmTransferRequest(transferCode);
      
      if (!transfer) {
        return res.status(404).json({ message: "Transfer request not found" });
      }

      // Create new ownership record
      if (transfer.toOwnerId) {
        const newOwner = await storage.getUser(transfer.toOwnerId);
        if (newOwner) {
          await storage.updateOwnershipStatus(transfer.artworkId, false);
          await storage.createOwnership({
            artworkId: transfer.artworkId,
            ownerId: transfer.toOwnerId,
            ownerName: newOwner.username,
            ownerType: "private_collector",
            acquisitionDetails: `Transfer confirmed via code: ${transferCode}`,
            isCurrentOwner: true,
          });
        }
      }

      res.json({ message: "Transfer confirmed successfully", transfer });
    } catch (error) {
      res.status(500).json({ message: "Failed to confirm transfer", error: error.message });
    }
  });

  // Scan logging
  app.post("/api/scans", async (req, res) => {
    try {
      const scanData = insertScanLogSchema.parse(req.body);
      const scanLog = await storage.createScanLog(scanData);
      
      res.status(201).json(scanLog);
    } catch (error) {
      res.status(400).json({ message: "Failed to log scan", error: error.message });
    }
  });

  // Admin routes
  app.get("/api/admin/stats", async (req, res) => {
    try {
      const artworks = await storage.getAllArtworks();
      const pendingTransfers = await storage.getPendingTransfers();
      
      // Mock some stats for demonstration
      const stats = {
        totalArtworks: artworks.length,
        scansToday: 89, // This would be calculated from scan logs in real implementation
        pendingTransfers: pendingTransfers.length,
        activeUsers: 456, // This would be calculated from user activity
      };
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch admin stats", error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
