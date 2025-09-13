/* eslint-disable @next/next/no-img-element */
"use client"

import Button from "@/components/root/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useState } from "react"
import { RequestEditsModal } from "./request-edits-modal"
import { UserRole, type User } from "@/types/admin"

interface UserVerificationModalProps {
  user: User
  onClose: () => void
  onApprove: () => void
  onReject: (reason:string) => void
  onRequestEdits: (reason: string) => void
}

export function UserVerificationModal({
  user,
  onClose,
  onApprove,
  onReject,
  onRequestEdits,
}: UserVerificationModalProps) {
  const [showRequestEdits, setShowRequestEdits] = useState(false)
  
  // Add dynamic profile data getter
  const getProfileData = (user: User) => {
    switch (user.role) {
      case UserRole.HOST:
        return {
          profile: user.hostProfile,
          type: 'Host',
          fields: user.hostProfile ? {
            specialties: user.hostProfile.specialties,
            subscriptionTier: user.hostProfile.subscriptionTier,
            certificationUrl: user.hostProfile.certificationUrl,
            hotelImageUrl: user.hostProfile.hotelImageUrl,
            rating: user.hostProfile.rating,
            reviewCount: user.hostProfile.reviewCount,
            responseTime: user.hostProfile.responseTime,
            totalEarnings: user.hostProfile.totalEarnings,
            verified: user.hostProfile.verified,
            languages:user.hostProfile.languages
          } : null
        };
      case UserRole.FACILITATOR:
        return {
          profile: user.facilitatorProfile,
          type: 'Facilitator',
          fields: user.facilitatorProfile ? {
            specialties: user.facilitatorProfile.specialties,
            certification: user.facilitatorProfile.certification,
            certificationUrl: user.facilitatorProfile.certificationUrl,
            rating: user.facilitatorProfile.rating,
            reviewCount: user.facilitatorProfile.reviewCount,
            isAvailable: user.facilitatorProfile.isAvailable,
            totalEarnings: user.facilitatorProfile.totalEarnings,
            languages:user.facilitatorProfile.languages
          } : null
        };
      case UserRole.TRANSLATOR:
        return {
          profile: user.translatorProfile,
          type: 'Translator',
          fields: user.translatorProfile ? {
            sourceLanguages: user.translatorProfile.sourceLanguages,
            targetLanguages: user.translatorProfile.targetLanguages,
            certification: user.translatorProfile.certification,
            certificationUrl: user.translatorProfile.certificationUrl,
            rating: user.translatorProfile.rating,
            reviewCount: user.translatorProfile.reviewCount,
            isAvailable: user.translatorProfile.isAvailable,
            totalEarnings: user.translatorProfile.totalEarnings,
            languages:user.translatorProfile.languages
          } : null
        };
      default:
        return { profile: null, type: 'User', fields: null };
    }
  };

  const profileData = getProfileData(user);

  // Add dynamic role-specific fields renderer
  const renderRoleSpecificFields = () => {
    if (!profileData.fields) return null;

    const fields = profileData.fields;

    return (
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">{profileData.type} Details</h3>
        <div className="grid grid-cols-2 gap-6">
          {/* Common fields for all roles */}
          {'rating' in fields && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Rating</h4>
              <p className="text-gray-600">{fields.rating}/5 ({fields.reviewCount} reviews)</p>
            </div>
          )}

          {'totalEarnings' in fields && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Total Earnings</h4>
              <p className="text-gray-600">${fields.totalEarnings}</p>
            </div>
          )}

          {/* Host-specific fields */}
          {user.role === UserRole.HOST && 'specialties' in fields && (
            <>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Specialties</h4>
                <p className="text-gray-600">{fields.specialties?.join(', ') || 'None listed'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Subscription Tier</h4>
                <p className="text-gray-600">{fields.subscriptionTier}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Response Time</h4>
                <p className="text-gray-600">{fields.responseTime || 'Not specified'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Verification Status</h4>
                <p className="text-gray-600">{fields.verified ? 'Verified' : 'Pending'}</p>
              </div>
            </>
          )}

          {/* Facilitator-specific fields */}
          {user.role === UserRole.FACILITATOR && 'specialties' in fields && (
            <>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Specialties</h4>
                <p className="text-gray-600">{fields.specialties?.join(', ') || 'None listed'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Availability</h4>
                <p className="text-gray-600">{fields.isAvailable ? 'Available' : 'Not Available'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Certification</h4>
                <p className="text-gray-600">{fields.certification || 'Not provided'}</p>
              </div>
            </>
          )}

          {/* Translator-specific fields */}
          {user.role === UserRole.TRANSLATOR && 'sourceLanguages' in fields && (
            <>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Source Languages</h4>
                <p className="text-gray-600">{fields.sourceLanguages?.join(', ') || 'None listed'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Target Languages</h4>
                <p className="text-gray-600">{fields.targetLanguages?.join(', ') || 'None listed'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Availability</h4>
                <p className="text-gray-600">{fields.isAvailable ? 'Available' : 'Not Available'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Certification</h4>
                <p className="text-gray-600">{fields.certification || 'Not provided'}</p>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };



  // Add the role-specific fields section after the Details Grid:
  // Insert this after the existing Details Grid and before Verification Details:
  { renderRoleSpecificFields() }

  // Update the status badge logic at the top:
  const getStatusBadge = (status: string) => {
    const profileStatus = profileData.fields && 'verified' in profileData.fields
      ? (profileData.fields.verified ? "approved" : "pending")
      : status;

    switch (profileStatus) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "needs_edits":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Needs Edits</Badge>
      default:
        return <Badge variant="secondary">{profileStatus}</Badge>
    }
  }


  if (showRequestEdits) {
    return (
      <RequestEditsModal
        onClose={() => setShowRequestEdits(false)}
        onSubmit={(reason) => {
          onRequestEdits(reason)
          setShowRequestEdits(false)
        }}
      />
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Profile Details</h2>
            <Button variant="secondary" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* User Info */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">User</h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-coral-500 rounded-full flex items-center justify-center text-white font-medium">
                    {user.firstName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                    <div className="text-sm text-gray-600">{user.role}</div>
                  </div>
                </div>
                {getStatusBadge(user.status)}
              </div>
            </div>

            {/* Bio */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Bio</h3>
              <p className="text-gray-600 leading-relaxed">
                {profileData.profile?.bio || user.bio || "No bio provided"}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Languages</h3>
                <p className="text-gray-600">
                  {profileData.profile?.languages?.join(', ') || user.languages?.join(', ') || "Not specified"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Tour Drafts</h3>
                <p className="text-gray-600">{user.tourDrafts || "2 listed"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Join Date</h3>
                <p className="text-gray-600">{user.createdAt.toLocaleString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Location</h3>
                <p className="text-gray-600">
                  {profileData.profile?.location || user.location || "Not specified"}
                </p>
              </div>

            </div>

            {renderRoleSpecificFields()}

            {/* Verification Details */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Verification Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/2] bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={profileData.profile?.certificationUrl}
                    alt="ID Document Front"
                    className="w-full h-full object-cover"
                  />
                </div>
                {user.role === "HOST" && "FACILITATOR"
                 && (
                   <div className="aspect-[3/2] bg-gray-100 rounded-lg overflow-hidden">
                  <img src={profileData?.profile?.hotelImageUrl} alt="ID Document Back" className="w-full h-full object-cover" />
                </div>
                )}
               
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
            <Button variant="secondary" onClick={() => onReject}>
              Reject
            </Button>
            <Button variant="secondary" onClick={() => setShowRequestEdits(true)}>
              Request Edits
            </Button>
            <Button variant="primary" className="" onClick={onApprove}>
              Approve
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
