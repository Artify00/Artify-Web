import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Palette, QrCode, RefreshCw, Users, Filter } from "lucide-react";

export default function AdminPage() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/admin/stats"],
  });

  const { data: artworks, isLoading: artworksLoading } = useQuery({
    queryKey: ["/api/artworks"],
  });

  if (statsLoading) {
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
      {/* Admin Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-semibold text-primary-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button className="bg-accent-500 hover:bg-accent-600 text-white">
                <Palette className="mr-2 h-4 w-4" />
                Add Artwork
              </Button>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  A
                </div>
                <span className="ml-2 text-primary-900 font-medium">Admin User</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                  <Palette className="text-accent-600 h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Artworks</p>
                  <p className="text-2xl font-semibold text-primary-900">
                    {stats?.totalArtworks || 0}
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
                    {stats?.scansToday || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <RefreshCw className="text-amber-600 h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Pending Transfers</p>
                  <p className="text-2xl font-semibold text-primary-900">
                    {stats?.pendingTransfers || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Users className="text-red-600 h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Active Users</p>
                  <p className="text-2xl font-semibold text-primary-900">
                    {stats?.activeUsers || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Artwork Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Artwork Management</CardTitle>
                <CardDescription>Manage and monitor all registered artworks</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Input 
                  placeholder="Search artworks..." 
                  className="w-64"
                />
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {artworksLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Artwork</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Artist</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Year</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {artworks && artworks.length > 0 ? (
                      artworks.map((artwork: any) => (
                        <tr key={artwork.id}>
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3"></div>
                              <div>
                                <p className="font-medium text-primary-900">{artwork.title}</p>
                                <p className="text-sm text-gray-500">ID: ART-{artwork.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-primary-900">{artwork.artist}</p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-primary-900">{artwork.year || "N/A"}</p>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant={artwork.isVerified ? "default" : "secondary"}>
                              {artwork.isVerified ? "Verified" : "Pending"}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" className="text-accent-500 hover:text-accent-600">
                                Edit
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-600">
                                View
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-gray-500">
                          No artworks found. Start by adding your first artwork.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
