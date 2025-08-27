"use client"
import { MainLayout } from "@/components/layout/main-layout"
import { StatCard } from "@/components/ui/stat-card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import { ActionMenu } from "@/components/ui/action-menu"
import { investors } from "@/data/investors"
import { Users, DollarSign, TrendingUp, UserCheck } from "lucide-react"

export default function InvestorsPage() {
  const activeInvestors = investors.filter((investor) => investor.status === "Active")
  const totalInvestment = investors.reduce((sum, investor) => sum + investor.totalInvestment, 0)
  const totalReturns = investors.reduce((sum, investor) => sum + investor.returns, 0)

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Investor Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Investors" value={investors.length} icon={Users} />
          <StatCard title="Active Investors" value={activeInvestors.length} icon={UserCheck} />
          <StatCard
            title="Total Investment"
            value={`$${totalInvestment.toLocaleString()}`}
            icon={DollarSign}
            trend={{ value: "+12% from last quarter", isPositive: true }}
          />
          <StatCard
            title="Total Returns"
            value={`$${totalReturns.toLocaleString()}`}
            icon={TrendingUp}
            trend={{ value: "+18% from last quarter", isPositive: true }}
          />
        </div>

        {/* Investors Table */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Investor Details</h2>
            <span className="text-sm text-gray-600">{investors.length} investors</span>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Investor ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Investment</TableHead>
                  <TableHead>Returns</TableHead>
                  <TableHead>ROI</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investors.map((investor) => {
                  const roi = ((investor.returns / investor.totalInvestment) * 100).toFixed(1)
                  return (
                    <TableRow key={investor.id}>
                      <TableCell className="font-medium">#{investor.id.toString().padStart(3, "0")}</TableCell>
                      <TableCell className="font-medium">{investor.name}</TableCell>
                      <TableCell>{investor.email}</TableCell>
                      <TableCell>{investor.phone}</TableCell>
                      <TableCell className="font-semibold">${investor.totalInvestment.toLocaleString()}</TableCell>
                      <TableCell className="font-semibold text-green-600">
                        ${investor.returns.toLocaleString()}
                      </TableCell>
                      <TableCell className="font-semibold text-blue-600">{roi}%</TableCell>
                      <TableCell>{new Date(investor.joinDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <StatusBadge status={investor.status} />
                      </TableCell>
                      <TableCell>
                        <ActionMenu
                          onView={() => console.log("View investor:", investor)}
                          onEdit={() => console.log("Edit investor:", investor)}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
