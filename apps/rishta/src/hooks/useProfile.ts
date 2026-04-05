import { useState, useCallback } from 'react';
import { UserProfile, PersonalInfo, LifestyleInfo, HoroscopeInfo } from '../types';
import { useRishtaStore } from '../store/rishtaStore';
import { supabase } from '@great-indian-wedding/auth';

export function useProfile() {
  const { userProfile, setUserProfile, setLoading, setError } = useRishtaStore();
  const [isUpdating, setIsUpdating] = useState(false);

  const createProfile = useCallback(
    async (
      userId: string,
      personalInfo: PersonalInfo,
      lifestyleInfo: LifestyleInfo,
      horoscopeInfo: HoroscopeInfo,
      kundaliType: string,
      bio: string
    ) => {
      setIsUpdating(true);
      setError(null);

      try {
        const newProfile: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'> = {
          userId,
          personalInfo,
          lifestyleInfo,
          horoscopeInfo,
          kundaliType: kundaliType as any,
          bio,
        };

        // Insert into user_profiles table
        const { data, error } = await supabase
          .from('user_profiles')
          .insert([
            {
              user_id: userId,
              first_name: personalInfo.firstName,
              last_name: personalInfo.lastName,
              age: personalInfo.age,
              city: personalInfo.city,
              mother_tongue: personalInfo.motherTongue,
              religion: personalInfo.religion,
              profession: lifestyleInfo.profession,
              education: lifestyleInfo.education,
              diet: lifestyleInfo.diet,
              drinking: lifestyleInfo.drinking,
              smoking: lifestyleInfo.smoking,
              family_type: lifestyleInfo.familyType,
              siblings: lifestyleInfo.siblings,
              kundali_type: kundaliType,
              bio,
            },
          ])
          .select()
          .single();

        if (error) throw error;

        setUserProfile(newProfile as UserProfile);
        return data;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to create profile';
        setError(message);
        throw error;
      } finally {
        setIsUpdating(false);
      }
    },
    [setUserProfile, setError]
  );

  const fetchProfile = useCallback(
    async (userId: string) => {
      setIsUpdating(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (error) throw error;

        const profile: UserProfile = {
          id: data.id,
          userId: data.user_id,
          personalInfo: {
            firstName: data.first_name,
            lastName: data.last_name,
            age: data.age,
            city: data.city,
            motherTongue: data.mother_tongue,
            religion: data.religion,
            caste: data.caste,
            gotra: data.gotra,
          },
          lifestyleInfo: {
            profession: data.profession,
            education: data.education,
            incomeRange: data.income_range,
            diet: data.diet,
            drinking: data.drinking,
            smoking: data.smoking,
            familyType: data.family_type,
            siblings: data.siblings,
          },
          horoscopeInfo: {
            birthDate: new Date(data.birth_date),
            birthTime: data.birth_time,
            birthPlace: data.birth_place,
          },
          kundaliType: data.kundali_type,
          bio: data.bio,
          profilePhotoUrl: data.profile_photo_url,
          voiceBioUrl: data.voice_bio_url,
          videoReelUrl: data.video_reel_url,
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at),
        };

        setUserProfile(profile);
        return profile;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch profile';
        setError(message);
        throw error;
      } finally {
        setIsUpdating(false);
      }
    },
    [setUserProfile, setError]
  );

  const uploadProfilePhoto = useCallback(
    async (userId: string, file: File) => {
      try {
        const filename = `${userId}_profile_${Date.now()}.jpg`;
        const { error } = await supabase.storage
          .from('profile-photos')
          .upload(filename, file);

        if (error) throw error;

        const { data } = supabase.storage.from('profile-photos').getPublicUrl(filename);
        return data.publicUrl;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to upload photo';
        setError(message);
        throw error;
      }
    },
    [setError]
  );

  return {
    userProfile,
    isUpdating,
    createProfile,
    fetchProfile,
    uploadProfilePhoto,
  };
}
