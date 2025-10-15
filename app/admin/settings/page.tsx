import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Platform Settings</h2>
        <p className="text-muted-foreground">Configure platform-wide settings and preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Basic platform configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteName">Site Name</Label>
            <Input id="siteName" defaultValue="YegnaBiz" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="siteDescription">Site Description</Label>
            <Textarea
              id="siteDescription"
              defaultValue="Ethiopia's premier business directory connecting customers with trusted local companies."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input id="contactEmail" type="email" defaultValue="contact@yegnabiz.com" />
          </div>

          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Verification Settings</CardTitle>
          <CardDescription>Configure business verification requirements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto-approve new listings</p>
              <p className="text-sm text-muted-foreground">Automatically approve new business registrations</p>
            </div>
            <Button variant="outline" className="bg-transparent">
              Configure
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Require email verification</p>
              <p className="text-sm text-muted-foreground">Users must verify email before posting</p>
            </div>
            <Button variant="outline" className="bg-transparent">
              Configure
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Review Moderation</CardTitle>
          <CardDescription>Configure review moderation settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto-publish reviews</p>
              <p className="text-sm text-muted-foreground">Automatically publish new reviews without moderation</p>
            </div>
            <Button variant="outline" className="bg-transparent">
              Configure
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Profanity filter</p>
              <p className="text-sm text-muted-foreground">Automatically flag reviews with inappropriate language</p>
            </div>
            <Button variant="outline" className="bg-transparent">
              Configure
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
