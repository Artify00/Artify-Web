import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/auth";
import { Palette, QrCode, Plus, Search, Eye, Edit, Share2, Filter } from "lucide-react";
import { Link, useLocation } from "wouter";
import type { Artwork } from "@shared/schema";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect if not authenticated
  if (!user) {
    setLocation("/login");
    return null;
  }

  const { data: userArtworks = [], isLoading } = useQuery<Artwork[]>({
    queryKey: ["/api/users/me/artworks"],
  });

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Palette className="text-accent-500 h-8 w-8 mr-3" />
                <span className="text-2xl font-bold text-primary-900">Artify</span>
              </Link>
              <span className="ml-8 text-gray-400">|</span>
              <h1 className="ml-8 text-xl font-semibold text-primary-900">My Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user.isAdmin && (
                <Link href="/admin">
                  <Button variant="outline" size="sm">
                    Admin Panel
                  </Button>
                </Link>
              )}
              <div className="flex items-center">
                <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="ml-2 text-primary-900 font-medium hidden sm:block">{user.username}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-primary-900 mb-2">
            Welcome back, {user.username}!
          </h2>
          <p className="text-gray-600">
            Manage your artwork collection and track ownership history
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                  <Palette className="text-accent-600 h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">My Artworks</p>
                  <p className="text-2xl font-semibold text-primary-900">
                    {userArtworks.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <QrCode className="text-emerald-600 h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">QR Scans Today</p>
                  <p className="text-2xl font-semibold text-primary-900">
                    {/* This would be calculated from scan logs */}
                    12
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Share2 className="text-amber-600 h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Verified Works</p>
                  <p className="text-2xl font-semibold text-primary-900">
                    {userArtworks.filter(artwork => artwork.isVerified).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-full">
                <Link href="/artwork/new" className="w-full">
                  <Button className="w-full bg-accent-500 hover:bg-accent-600 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Artwork
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Artworks Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>My Artworks</CardTitle>
                <CardDescription>Manage and track your artwork collection</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Input 
                  placeholder="Search artworks..." 
                  className="w-64"
                />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {userArtworks && userArtworks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userArtworks.map((artwork) => (
                  <Card key={artwork.id} className="hover:shadow-md transition-shadow">
                    <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                      {artwork.imageUrl ? (
                        <img 
                          src={artwork.imageUrl} 
                          alt={artwork.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Palette className="h-16 w-16 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-primary-900 text-lg truncate">
                          {artwork.title}
                        </h3>
                        <Badge variant={artwork.isVerified ? "default" : "secondary"}>
                          {artwork.isVerified ? "Verified" : "Pending"}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-1">by {artwork.artist}</p>
                      <p className="text-sm text-gray-500 mb-3">
                        {artwork.year ? `${artwork.year} • ` : ""}{artwork.medium || "Unknown medium"}
                      </p>
                      <div className="flex items-center justify-between">
                        <Link href={`/artwork/${artwork.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                        </Link>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <QrCode className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Palette className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No artworks yet</h3>
                <p className="text-gray-600 mb-6">
                  Start building your collection by registering your first artwork
                </p>
                <Link href="/artwork/new">
                  <Button className="bg-accent-500 hover:bg-accent-600 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Register First Artwork
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}