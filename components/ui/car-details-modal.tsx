"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { StatusBadge } from "./status-badge"
import type { Car } from "@/types"

interface CarDetailsModalProps {
  car: Car | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CarDetailsModal({ car, open, onOpenChange }: CarDetailsModalProps) {
  if (!car) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Car Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg">
                {car.company} {car.name}
              </h3>
              <p className="text-gray-600">Engine: {car.engineNumber}</p>
            </div>
            <div className="text-right">
              <StatusBadge status={car.status} />
              <p className="text-sm text-gray-600 mt-1">Grade {car.grade}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Mileage</label>
                <p className="text-lg">{car.mileage}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Import Year</label>
                <p className="text-lg">{car.importYear}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Batch</label>
                <p className="text-lg">{car.batch}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Purchase Price</label>
                <p className="text-lg font-semibold">${car.price?.toLocaleString()}</p>
              </div>
              {car.soldPrice && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Sold Price</label>
                  <p className="text-lg font-semibold text-green-600">${car.soldPrice.toLocaleString()}</p>
                </div>
              )}
              {car.soldDate && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Sold Date</label>
                  <p className="text-lg">{new Date(car.soldDate).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>

          {/* Buyer Info */}
          {car.buyerInfo && (
            <div className="border-t pt-4">
              <label className="text-sm font-medium text-gray-500">Buyer Information</label>
              <p className="text-lg">{car.buyerInfo}</p>
            </div>
          )}

          {/* Profit Calculation */}
          {car.soldPrice && car.price && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Profit:</span>
                <span
                  className={`text-lg font-bold ${car.soldPrice - car.price > 0 ? "text-green-600" : "text-red-600"}`}
                >
                  ${(car.soldPrice - car.price).toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
