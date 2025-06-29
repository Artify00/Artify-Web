import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { RefreshCw, ArrowRight, Info } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function TransferConfirmPage() {
  const params = useParams();
  const transferCode = params.transferCode;
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [confirmations, setConfirmations] = useState({
    ownership: false,
    permanent: false,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: [`/api/transfers/${transferCode}`],
    enabled: !!transferCode,
  });

  const confirmMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/transfers/${transferCode}/confirm`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Transfer confirmed",
        description: "Ownership has been successfully transferred.",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/transfers/${transferCode}`] });
      setLocation(`/artwork/${data.artwork.id}`);
    },
    onError: (error: Error) => {
      toast({
        title: "Transfer failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleConfirm = () => {
    if (!confirmations.ownership || !confirmations.permanent) {
      toast({
        title: "Please confirm all requirements",
        description: "You must check both confirmation boxes to proceed.",
        variant: "destructive",
      });
      return;
    }
    confirmMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
                <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-24" />
                <Skeleton className="h-16" />
                <Skeleton className="h-16" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Transfer Not Found</h1>
              <p className="text-gray-600 mb-6">
                The transfer request you're looking for doesn't exist or has expired.
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

  const { transfer, artwork, currentOwnership } = data;

  if (transfer.status === "confirmed") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="text-green-600 h-8 w-8" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Transfer Already Confirmed</h1>
              <p className="text-gray-600 mb-6">
                This transfer has already been confirmed and processed.
              </p>
              <Link href={`/artwork/${artwork.id}`}>
                <Button>View Artwork</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card>
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="text-accent-600 h-8 w-8" />
              </div>
              <h1 className="text-2xl font-bold text-primary-900">Confirm Ownership Transfer</h1>
              <p className="text-gray-600 mt-2">Review the details below and confirm the transfer</p>
            </div>

            {/* Transfer Details */}
            <div className="space-y-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-medium text-primary-900 mb-3">Artwork Details</h3>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3 flex items-center justify-center">
                    {artwork.imageUrl ? (
                      <img src={artwork.imageUrl} alt={artwork.title} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <div className="text-gray-400 text-xs">IMG</div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-primary-900">{artwork.title}</p>
                    <p className="text-sm text-gray-500">by {artwork.artist}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-red-600 font-semibold">
                      {currentOwnership?.ownerName?.charAt(0).toUpperCase() || 'C'}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-primary-900">
                    {currentOwnership?.ownerName || 'Current Owner'}
                  </p>
                  <p className="text-xs text-gray-500">Current Owner</p>
                </div>
                
                <div className="flex-1 flex items-center justify-center">
                  <ArrowRight className="text-accent-500 h-6 w-6" />
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-green-600 font-semibold">N</span>
                  </div>
                  <p className="text-sm font-medium text-primary-900">New Owner</p>
                  <p className="text-xs text-gray-500">You</p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center">
                  <Info className="text-blue-600 mr-3 h-5 w-5" />
                  <div>
                    <p className="font-medium text-blue-900">Transfer Code</p>
                    <p className="text-blue-700 font-mono text-lg">{transfer.transferCode}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmation Checkboxes */}
            <div className="space-y-4 mb-8">
              <label className="flex items-start space-x-3">
                <Checkbox
                  checked={confirmations.ownership}
                  onCheckedChange={(checked) => 
                    setConfirmations(prev => ({ ...prev, ownership: !!checked }))
                  }
                />
                <span className="text-sm text-gray-700">
                  I confirm that I am the authorized recipient of this artwork and accept full ownership responsibility.
                </span>
              </label>
              
              <label className="flex items-start space-x-3">
                <Checkbox
                  checked={confirmations.permanent}
                  onCheckedChange={(checked) => 
                    setConfirmations(prev => ({ ...prev, permanent: !!checked }))
                  }
                />
                <span className="text-sm text-gray-700">
                  I understand that this transfer will be permanently recorded in the artwork's provenance history.
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleConfirm}
                className="w-full bg-accent-500 hover:bg-accent-600"
                disabled={confirmMutation.isPending || !confirmations.ownership || !confirmations.permanent}
              >
                {confirmMutation.isPending ? "Confirming Transfer..." : "Confirm Transfer"}
              </Button>
              
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Cancel Transfer
                </Button>
              </Link>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Need help? <a href="#support" className="text-accent-500 hover:text-accent-600">Contact Support</a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
