-- ============================================
-- 1단계: products 테이블에 slug 컬럼 추가
-- ============================================
ALTER TABLE products ADD COLUMN slug TEXT UNIQUE;

-- ============================================
-- 2단계: 모든 상품을 영문으로 업데이트 및 slug 생성
-- ============================================

-- 1. Morning Yoga Class
UPDATE products
SET
  title = 'Morning Yoga Class',
  description = 'Start your day with a rejuvenating yoga session designed to improve flexibility, balance, and inner peace. Perfect for all skill levels, our experienced instructors will guide you through a series of poses and breathing exercises.',
  slug = 'morning-yoga-class',
  category = 'Wellness'
WHERE title LIKE '%요가%';

-- 2. Italian Cooking Class
UPDATE products
SET
  title = 'Italian Cooking Class',
  description = 'Learn the art of Italian cuisine from professional chefs. We''ll teach you how to make authentic pasta, risotto, and traditional sauces from scratch. Enjoy tasting your creations at the end of the class.',
  slug = 'italian-cooking-class',
  category = 'Culinary'
WHERE title LIKE '%요리%' AND title LIKE '%이탈리안%';

-- 3. Pilates Lesson
UPDATE products
SET
  title = 'Pilates Lesson',
  description = 'Strengthen your core and improve your posture with our comprehensive Pilates program. These low-impact exercises are perfect for building lean muscle and enhancing overall body awareness.',
  slug = 'pilates-lesson',
  category = 'Fitness'
WHERE title LIKE '%필라테스%';

-- 4. Photography Basics to Advanced
UPDATE products
SET
  title = 'Photography Basics to Advanced',
  description = 'Master photography from composition and lighting to post-processing. Whether you''re a beginner or intermediate photographer, this comprehensive course covers everything you need to take stunning images.',
  slug = 'photography-basics-to-advanced',
  category = 'Creative'
WHERE title LIKE '%사진%';

-- 5. K-POP Dance Class
UPDATE products
SET
  title = 'K-POP Dance Class',
  description = 'Learn the latest K-POP dance moves in this high-energy class. We''ll teach you choreography from popular Korean groups and help you develop rhythm, coordination, and confidence on the dance floor.',
  slug = 'kpop-dance-class',
  category = 'Dance'
WHERE title LIKE '%댄스%' AND title LIKE '%K-POP%';

-- 6. Meditation and Mindfulness
UPDATE products
SET
  title = 'Meditation and Mindfulness',
  description = 'Find inner calm and reduce stress through guided meditation and mindfulness techniques. Learn practical methods to manage anxiety and cultivate a peaceful mind in your daily life.',
  slug = 'meditation-and-mindfulness',
  category = 'Wellness'
WHERE title LIKE '%명상%';

-- 7. Acoustic Guitar Lesson
UPDATE products
SET
  title = 'Acoustic Guitar Lesson',
  description = 'Learn to play acoustic guitar with our experienced instructors. From basic chords to advanced playing techniques, we''ll help you develop your skills and express yourself through music.',
  slug = 'acoustic-guitar-lesson',
  category = 'Music'
WHERE title LIKE '%기타%' AND title LIKE '%어쿠스틱%';

-- 8. Wine Tasting Class
UPDATE products
SET
  title = 'Wine Tasting Class',
  description = 'Explore the world of wine with expert sommeliers. Learn about different grape varieties, wine regions, and tasting techniques while enjoying a curated selection of fine wines.',
  slug = 'wine-tasting-class',
  category = 'Culinary'
WHERE title LIKE '%와인%';

-- ============================================
-- 3단계: 확인 (실행 후 아래 쿼리로 결과 확인)
-- ============================================
-- SELECT id, title, slug, category, description FROM products ORDER BY created_at;
