
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfileFormData {
  full_name?: string | null;
  avatar_url?: string | null;
}

export const fetchUserProfile = async () => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.user.id)
      .single();

    if (error) {
      throw error;
    }

    return data as UserProfile;
  } catch (error: any) {
    console.error("Error fetching user profile:", error.message);
    toast.error("Failed to load user profile");
    return null;
  }
};

export const updateUserProfile = async (profile: ProfileFormData) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({
        ...profile,
        updated_at: new Date().toISOString()
      })
      .eq("id", user.user.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    toast.success("Profile updated successfully");
    return data;
  } catch (error: any) {
    console.error("Error updating user profile:", error.message);
    toast.error("Failed to update profile");
    throw error;
  }
};

export const uploadAvatar = async (file: File) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    const fileExt = file.name.split('.').pop();
    const filePath = `${user.user.id}/${Date.now()}.${fileExt}`;

    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    const avatarUrl = urlData.publicUrl;

    // Update the user profile
    const { data, error } = await supabase
      .from('profiles')
      .update({ avatar_url: avatarUrl })
      .eq('id', user.user.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    toast.success("Avatar updated successfully");
    return data;
  } catch (error: any) {
    console.error("Error uploading avatar:", error.message);
    toast.error("Failed to upload avatar");
    throw error;
  }
};
