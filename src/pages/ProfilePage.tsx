
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const ProfilePage: React.FC = () => {
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Avatar Column */}
          <Card className="md:col-span-1 flex flex-col items-center">
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-primary/10 border-4 border-primary/20 flex items-center justify-center mb-4">
                <span className="text-4xl font-semibold text-primary">JS</span>
              </div>
              <h2 className="text-xl font-semibold">John Smith</h2>
              <p className="text-sm text-muted-foreground mb-4">Member since Apr 2025</p>
              <Button variant="outline" className="w-full">Change Picture</Button>
            </CardContent>
          </Card>

          {/* Profile Details Column */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} defaultValue="John" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Smith" {...field} defaultValue="Smith" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john.smith@example.com" {...field} defaultValue="john.smith@example.com" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 98765 43210" {...field} defaultValue="+91 98765 43210" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4">
                    <Button className="bg-primary hover:bg-primary-dark">Save Changes</Button>
                  </div>
                </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="md:col-span-3">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                  <FormField
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-4">
                    <Button className="bg-primary hover:bg-primary-dark">Update Password</Button>
                  </div>
                </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="md:col-span-3">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Currency</h3>
                    <p className="text-sm text-muted-foreground">Set your preferred currency for the app</p>
                  </div>
                  <div className="w-32">
                    <select className="w-full p-2 border rounded-md">
                      <option value="INR">INR - ₹</option>
                      <option value="USD">USD - $</option>
                      <option value="EUR">EUR - €</option>
                      <option value="GBP">GBP - £</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive email updates about your account</p>
                  </div>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
