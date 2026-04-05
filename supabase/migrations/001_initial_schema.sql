-- Create couples table
CREATE TABLE couples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user2_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  couple_name VARCHAR(255),
  journey_stage TEXT DEFAULT 'SEEKING',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user profiles table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  couple_id UUID REFERENCES couples(id) ON DELETE SET NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255),
  age INT,
  city VARCHAR(255),
  mother_tongue VARCHAR(255),
  religion VARCHAR(255),
  profession VARCHAR(255),
  education VARCHAR(255),
  diet VARCHAR(50),
  drinking BOOLEAN DEFAULT false,
  smoking BOOLEAN DEFAULT false,
  family_type VARCHAR(50),
  siblings INT,
  kundali_type VARCHAR(255),
  bio TEXT,
  role TEXT DEFAULT 'user', -- 'user', 'family_member', 'admin'
  profile_photo_url VARCHAR(500),
  voice_bio_url VARCHAR(500),
  video_reel_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create horoscope data table
CREATE TABLE horoscopes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  birth_date DATE NOT NULL,
  birth_time TIME,
  birth_place VARCHAR(255),
  rashi VARCHAR(50),
  nakshatra VARCHAR(50),
  guna_milan_score INT, -- out of 36
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create matches table
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID NOT NULL REFERENCES couples(id) ON DELETE CASCADE,
  user1_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user2_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  compatibility_score FLOAT,
  mutual_interest BOOLEAN DEFAULT false,
  user1_interest BOOLEAN DEFAULT false,
  user2_interest BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending', -- 'pending', 'matched', 'rejected'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create dates table
CREATE TABLE dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  couple_id UUID NOT NULL REFERENCES couples(id) ON DELETE CASCADE,
  venue_name VARCHAR(255),
  venue_address VARCHAR(500),
  venue_type VARCHAR(100), -- 'cafe', 'heritage', 'restaurant', 'garden', 'cultural'
  google_maps_link VARCHAR(500),
  budget_estimate INT,
  dress_code VARCHAR(255),
  date_suggested_at TIMESTAMP WITH TIME ZONE,
  scheduled_date DATE,
  status TEXT DEFAULT 'suggested', -- 'suggested', 'scheduled', 'completed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create date check-ins table
CREATE TABLE date_checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date_id UUID NOT NULL REFERENCES dates(id) ON DELETE CASCADE,
  couple_id UUID NOT NULL REFERENCES couples(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create weddings table
CREATE TABLE weddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID NOT NULL UNIQUE REFERENCES couples(id) ON DELETE CASCADE,
  wedding_date DATE NOT NULL,
  wedding_venue VARCHAR(255),
  package_type VARCHAR(50), -- 'Roka', 'Sangeet', 'Saat Phere', 'Maharaja'
  budget_total INT,
  theme_name VARCHAR(255),
  religion VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create vendors table
CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100), -- 'decorator', 'caterer', 'photographer', 'mehendi', 'priest', 'musician'
  city VARCHAR(255),
  rating FLOAT,
  review_count INT DEFAULT 0,
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  portfolio_url VARCHAR(500),
  price_range VARCHAR(100),
  availability_start DATE,
  availability_end DATE,
  varmala_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create vendor bookings table
CREATE TABLE vendor_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id UUID NOT NULL REFERENCES weddings(id) ON DELETE CASCADE,
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
  booking_date DATE,
  deposit_amount INT,
  deposit_paid BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create honeymoons table
CREATE TABLE honeymoons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID NOT NULL UNIQUE REFERENCES couples(id) ON DELETE CASCADE,
  destination VARCHAR(255),
  destination_type VARCHAR(50), -- 'beach', 'mountain', 'culture', 'adventure', 'luxury', 'budget'
  start_date DATE,
  end_date DATE,
  budget_total INT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create honeymoon bookings table (flights, hotels)
CREATE TABLE honeymoon_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  honeymoon_id UUID NOT NULL REFERENCES honeymoons(id) ON DELETE CASCADE,
  booking_type VARCHAR(50), -- 'flight', 'hotel'
  provider_name VARCHAR(255),
  booking_reference VARCHAR(255),
  booking_date DATE,
  total_cost INT,
  currency VARCHAR(10) DEFAULT 'INR',
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create our_story table (shared milestones)
CREATE TABLE our_story (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID NOT NULL REFERENCES couples(id) ON DELETE CASCADE,
  stage TEXT NOT NULL, -- 'SEEKING', 'MATCHED', 'DATE_SET', 'DATING', 'WEDDING', 'HONEYMOONING'
  title VARCHAR(255),
  description TEXT,
  metadata JSONB, -- stores flexible data like match date, venue, etc.
  photos JSONB, -- array of photo URLs
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create expense tracking table
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
  honeymoon_id UUID REFERENCES honeymoons(id) ON DELETE CASCADE,
  category VARCHAR(100), -- 'decoration', 'catering', 'photography', 'transportation', 'accommodation', 'activities'
  description VARCHAR(255),
  amount INT,
  currency VARCHAR(10) DEFAULT 'INR',
  date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indices for performance
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_user_profiles_couple_id ON user_profiles(couple_id);
CREATE INDEX idx_matches_couple_id ON matches(couple_id);
CREATE INDEX idx_matches_status ON matches(status);
CREATE INDEX idx_dates_match_id ON dates(match_id);
CREATE INDEX idx_weddings_couple_id ON weddings(couple_id);
CREATE INDEX idx_vendor_bookings_wedding_id ON vendor_bookings(wedding_id);
CREATE INDEX idx_honeymoons_couple_id ON honeymoons(couple_id);
CREATE INDEX idx_our_story_couple_id ON our_story(couple_id);
CREATE INDEX idx_our_story_stage ON our_story(stage);
CREATE INDEX idx_expenses_wedding_id ON expenses(wedding_id);
CREATE INDEX idx_expenses_honeymoon_id ON expenses(honeymoon_id);

-- Enable RLS (Row Level Security) for couples table
ALTER TABLE couples ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE horoscopes ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE weddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE honeymoons ENABLE ROW LEVEL SECURITY;
ALTER TABLE our_story ENABLE ROW LEVEL SECURITY;

-- RLS Policy: couples can view and edit their own couple record
CREATE POLICY "couples_can_view_own" ON couples
  FOR SELECT USING (
    auth.uid() = user1_id OR auth.uid() = user2_id
  );

CREATE POLICY "couples_can_update_own" ON couples
  FOR UPDATE USING (
    auth.uid() = user1_id OR auth.uid() = user2_id
  );

-- RLS Policy: users can view and edit their own profile
CREATE POLICY "users_can_view_own_profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "users_can_update_own_profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policy: our_story is visible to couple members
CREATE POLICY "our_story_visible_to_couple" ON our_story
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM couples
      WHERE couples.id = our_story.couple_id
      AND (couples.user1_id = auth.uid() OR couples.user2_id = auth.uid())
    )
  );
