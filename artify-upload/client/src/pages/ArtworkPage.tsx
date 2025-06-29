import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Shield, Eye, Star, User, Building, Palette } from "lucide-react";
import { Link } from "wouter";

export default function ArtworkPage() {
  const params = useParams();
  const artworkId = params.id;

  const { data, isLoading, error } = useQuery({
    queryKey: [`/api/artworks/${artworkId}`],
    enabled: !!artworkId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-6 w-48 mb-8" />
          <div className="lg:grid lg:grid-cols-2 lg:gap-12">
            <Skeleton className="h-96 w-full mb-8 lg:mb-0" />
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <div className="grid grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-16" />
                ))}
              </div>
              <Skeleton className="h-24" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Artwork Not Found</h1>
              <p className="text-gray-600 mb-6">
                The artwork you're looking for doesn't exist or has been removed.
              </p>
              <Link href="/">
                <Button>Return Home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { artwork, ownerships, currentOwnership } = data;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/">
                <a className="text-gray-500 hover:text-accent-500 flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Home
                </a>
              </Link>
            </li>
            <li>
              <span className="text-gray-400 mx-2">/</span>
            </li>
            <li>
              <span className="text-gray-900 font-medium">{artwork.title}</span>
            </li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Artwork Image */}
          <div className="mb-8 lg:mb-0">
            <Card className="overflow-hidden">
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                {artwork.imageUrl ? (
                  <img 
                    src={artwork.imageUrl} 
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <Palette className="h-16 w-16 mx-auto mb-4" />
                    <p>No image available</p>
                  </div>
                )}
              </div>
              <CardContent className="p-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">QR Code</h3>
                    <p className="text-sm text-gray-500">Scan to verify authenticity</p>
                  </div>
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="w-12 h-12 bg-primary-900 opacity-20 grid grid-cols-3 gap-px">
                      <div className="bg-current"></div>
                      <div className="bg-current opacity-0"></div>
                      <div className="bg-current"></div>
                      <div className="bg-current opacity-0"></div>
                      <div className="bg-current"></div>
                      <div className="bg-current opacity-0"></div>
                      <div className="bg-current"></div>
                      <div className="bg-current"></div>
                      <div className="bg-current opacity-0"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Artwork Details */}
          <div>
            <Card className="p-8">
              <h1 className="text-3xl font-bold text-primary-900 mb-4">
                {artwork.title}
              </h1>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Artist</h3>
                  <p className="text-lg text-primary-900">{artwork.artist}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Year</h3>
                  <p className="text-lg text-primary-900">{artwork.year || "Unknown"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Medium</h3>
                  <p className="text-lg text-primary-900">{artwork.medium || "Not specified"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Dimensions</h3>
                  <p className="text-lg text-primary-900">{artwork.dimensions || "Not specified"}</p>
                </div>
              </div>

              {artwork.description && (
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{artwork.description}</p>
                </div>
              )}

              <div className={`flex items-center justify-between p-4 rounded-xl ${
                artwork.isVerified ? 'bg-green-50' : 'bg-yellow-50'
              }`}>
                <div className="flex items-center">
                  <Shield className={`mr-3 h-5 w-5 ${
                    artwork.isVerified ? 'text-green-600' : 'text-yellow-600'
                  }`} />
                  <span className={`font-medium ${
                    artwork.isVerified ? 'text-green-800' : 'text-yellow-800'
                  }`}>
                    {artwork.isVerified ? 'Verified Authentic' : 'Verification Pending'}
                  </span>
                </div>
                <span className={`text-sm ${
                  artwork.isVerified ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {artwork.isVerified ? 'Verified' : 'Pending'}
                </span>
              </div>
            </Card>

            {/* Current Owner */}
            {currentOwnership && (
              <Card className="p-8 mt-6">
                <h2 className="text-xl font-semibold text-primary-900 mb-4">Current Owner</h2>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {currentOwnership.ownerName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-primary-900">{currentOwnership.ownerName}</p>
                    <p className="text-sm text-gray-500 capitalize">
                      {currentOwnership.ownerType.replace('_', ' ')}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Provenance History */}
        {ownerships && ownerships.length > 0 && (
          <Card className="mt-12 p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-primary-900">Provenance History</h2>
            </div>

            <div className="space-y-6">
              {ownerships.map((ownership, index) => (
                <div key={ownership.id} className="flex">
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      ownership.ownerType === 'artist' ? 'bg-emerald-500' :
                      ownership.ownerType === 'gallery' ? 'bg-purple-500' :
                      'bg-accent-500'
                    }`}>
                      {ownership.ownerType === 'artist' ? (
                        <Palette className="text-white h-5 w-5" />
                      ) : ownership.ownerType === 'gallery' ? (
                        <Building className="text-white h-5 w-5" />
                      ) : (
                        <User className="text-white h-5 w-5" />
                      )}
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-primary-900">
                        {ownership.ownerType === 'artist' ? 'Created by' : 'Acquired by'} {ownership.ownerName}
                      </p>
                      <span className="text-sm text-gray-500">
                        {new Date(ownership.acquisitionDate || '').toLocaleDateString()}
                      </span>
                    </div>
                    {ownership.acquisitionDetails && (
                      <p className="text-gray-600 mt-1">{ownership.acquisitionDetails}</p>
                    )}
                    <div className="flex items-center mt-2">
                      <Shield className="text-green-500 mr-2 h-4 w-4" />
                      <span className="text-sm text-green-600">
                        {ownership.isCurrentOwner ? 'Current Owner' : 'Verified Transaction'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
