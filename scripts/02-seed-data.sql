-- Insert sample companies
INSERT INTO companies (name, slug, description, category, subcategory, email, phone, website, address, city, region, is_verified, is_featured, is_premium, rating, review_count, view_count, established_year, employee_count) VALUES
('Ethio Telecom', 'ethio-telecom', 'Leading telecommunications service provider in Ethiopia offering mobile, internet, and enterprise solutions.', 'Technology', 'Telecommunications', 'info@ethiotelecom.et', '+251-11-515-5000', 'https://www.ethiotelecom.et', 'Churchill Avenue', 'Addis Ababa', 'Addis Ababa', TRUE, TRUE, TRUE, 4.2, 1250, 15420, 1894, '1000+'),
('Ethiopian Airlines', 'ethiopian-airlines', 'Africa''s largest and most profitable airline, connecting Ethiopia to the world with exceptional service.', 'Transportation', 'Aviation', 'contact@ethiopianairlines.com', '+251-11-665-5666', 'https://www.ethiopianairlines.com', 'Bole International Airport', 'Addis Ababa', 'Addis Ababa', TRUE, TRUE, TRUE, 4.5, 3420, 28950, 1945, '1000+'),
('Dashen Bank', 'dashen-bank', 'One of Ethiopia''s leading private banks offering comprehensive banking and financial services.', 'Finance', 'Banking', 'info@dashenbanksc.com', '+251-11-465-1010', 'https://www.dashenbanksc.com', 'Debre Zeit Road', 'Addis Ababa', 'Addis Ababa', TRUE, TRUE, TRUE, 4.3, 890, 12340, 1995, '500-1000'),
('Awash Bank', 'awash-bank', 'Premier financial institution providing modern banking solutions across Ethiopia.', 'Finance', 'Banking', 'awashbank@ethionet.et', '+251-11-156-6066', 'https://www.awashbank.com', 'Ras Abebe Aregay Street', 'Addis Ababa', 'Addis Ababa', TRUE, FALSE, TRUE, 4.1, 654, 9870, 1994, '500-1000'),
('Habesha Breweries', 'habesha-breweries', 'Premium Ethiopian brewery producing quality beers including Habesha Beer and Bedele Special.', 'Food & Beverage', 'Brewery', 'info@habeshabreweries.com', '+251-11-618-2020', 'https://www.habeshabreweries.com', 'Addis Ababa-Debre Zeit Road', 'Addis Ababa', 'Addis Ababa', TRUE, TRUE, FALSE, 4.4, 432, 8650, 2009, '200-500'),
('Zemen Insurance', 'zemen-insurance', 'Trusted insurance company offering comprehensive coverage for individuals and businesses.', 'Finance', 'Insurance', 'info@zemeninsurance.com', '+251-11-662-6027', 'https://www.zemeninsurance.com', 'Bole Road', 'Addis Ababa', 'Addis Ababa', TRUE, FALSE, FALSE, 4.0, 234, 5430, 2009, '100-200'),
('Yoha Construction', 'yoha-construction', 'Leading construction company specializing in residential and commercial projects.', 'Construction', 'General Contracting', 'info@yohaconstruction.com', '+251-11-552-3344', 'https://www.yohaconstruction.com', 'Mexico Square', 'Addis Ababa', 'Addis Ababa', TRUE, FALSE, FALSE, 4.2, 156, 4320, 2005, '200-500'),
('Sheba Leather', 'sheba-leather', 'Premium leather goods manufacturer and exporter, showcasing Ethiopian craftsmanship.', 'Manufacturing', 'Leather Goods', 'sales@shebaleather.com', '+251-11-618-5050', 'https://www.shebaleather.com', 'Industrial Area', 'Addis Ababa', 'Addis Ababa', TRUE, TRUE, FALSE, 4.3, 287, 6540, 1998, '100-200'),
('Horizon Addis Hotel', 'horizon-addis-hotel', 'Luxury hotel offering world-class accommodation and hospitality in the heart of Addis Ababa.', 'Hospitality', 'Hotels', 'reservations@horizonaddis.com', '+251-11-618-8888', 'https://www.horizonaddis.com', 'Bole Road', 'Addis Ababa', 'Addis Ababa', TRUE, TRUE, TRUE, 4.6, 892, 11230, 2015, '100-200'),
('Nile Insurance', 'nile-insurance', 'Comprehensive insurance solutions for life, health, property, and business needs.', 'Finance', 'Insurance', 'info@nileinsurance.com', '+251-11-551-5151', 'https://www.nileinsurance.com', 'Arat Kilo', 'Addis Ababa', 'Addis Ababa', TRUE, FALSE, FALSE, 3.9, 178, 3890, 1995, '50-100'),
('Moha Soft Drinks', 'moha-soft-drinks', 'Leading beverage company producing popular soft drinks and bottled water across Ethiopia.', 'Food & Beverage', 'Beverages', 'info@mohagroup.com', '+251-11-618-3030', 'https://www.mohagroup.com', 'Kality', 'Addis Ababa', 'Addis Ababa', TRUE, FALSE, TRUE, 4.2, 543, 9120, 2007, '500-1000'),
('Sunshine Construction', 'sunshine-construction', 'Innovative construction firm delivering quality infrastructure and building projects.', 'Construction', 'General Contracting', 'info@sunshineconstruction.et', '+251-11-662-7070', NULL, 'CMC Road', 'Addis Ababa', 'Addis Ababa', FALSE, FALSE, FALSE, 3.8, 89, 2340, 2010, '50-100');

-- Insert sample users
INSERT INTO users (email, password_hash, full_name, phone, location, role, status) VALUES
('admin@yegnabiz.com', '$2b$10$0EEUCCeH9NsfotSO.UiyiuQkSemZEE1/WrOOKrN/6wjMgK7NuFWTa', 'Admin User', '+251-911-123456', 'Addis Ababa, Ethiopia', 'admin', 'active'),
('owner1@example.com', '$2b$10$tzq6Rigk9GgQl9hIIIMF6uWURzyrNDfpitUa.ZN2027jFU5MokK4y', 'Abebe Kebede', '+251-911-234567', 'Bahir Dar, Ethiopia', 'business_owner', 'active'),
('owner2@example.com', '$2b$10$K3Qxboff5rqML5oqkbV8RO7GKzsSR/35DyZCk4GOYb/8KMbAs7mmq', 'Tigist Alemu', '+251-911-345678', 'Hawassa, Ethiopia', 'business_owner', 'active'),
('user1@example.com', '$2b$10$bjbgjfF.qBBAP.LykbdOWOhli1cYT9CtRlbLhyIOhQJWUr/lx4Uc2', 'Dawit Tesfaye', '+251-911-456789', 'Gondar, Ethiopia', 'user', 'active');

-- Link owners to companies
INSERT INTO company_owners (user_id, company_id, role) VALUES
(2, 7, 'owner'),
(3, 8, 'owner');

-- Insert sample reviews
INSERT INTO reviews (company_id, user_id, user_name, rating, title, comment, is_verified) VALUES
(1, 4, 'Dawit Tesfaye', 4, 'Good Service', 'Reliable network coverage across the country. Customer service could be improved.', TRUE),
(2, 4, 'Dawit Tesfaye', 5, 'Excellent Airline', 'World-class service and comfortable flights. Proud of Ethiopian Airlines!', TRUE),
(3, 4, 'Dawit Tesfaye', 4, 'Professional Banking', 'Good banking services with modern facilities. Mobile app is very convenient.', TRUE),
(9, 4, 'Dawit Tesfaye', 5, 'Amazing Stay', 'Beautiful hotel with excellent service. The staff were very welcoming and professional.', TRUE);

-- Insert sample social links
INSERT INTO social_links (company_id, platform, url) VALUES
(1, 'facebook', 'https://facebook.com/ethiotelecom'),
(1, 'twitter', 'https://twitter.com/ethiotelecom'),
(2, 'facebook', 'https://facebook.com/ethiopianairlines'),
(2, 'twitter', 'https://twitter.com/flyethiopian'),
(2, 'instagram', 'https://instagram.com/ethiopianairlines'),
(3, 'facebook', 'https://facebook.com/dashenbank'),
(3, 'linkedin', 'https://linkedin.com/company/dashen-bank');

-- Insert sample business hours (Monday = 0, Sunday = 6)
INSERT INTO business_hours (company_id, day_of_week, open_time, close_time, is_closed) VALUES
-- Ethio Telecom (Mon-Fri 8:00-17:00, Sat 8:00-13:00, Sun closed)
(1, 0, '08:00', '17:00', FALSE),
(1, 1, '08:00', '17:00', FALSE),
(1, 2, '08:00', '17:00', FALSE),
(1, 3, '08:00', '17:00', FALSE),
(1, 4, '08:00', '17:00', FALSE),
(1, 5, '08:00', '13:00', FALSE),
(1, 6, NULL, NULL, TRUE),
-- Dashen Bank (Mon-Fri 8:00-16:00, Sat 8:00-12:00, Sun closed)
(3, 0, '08:00', '16:00', FALSE),
(3, 1, '08:00', '16:00', FALSE),
(3, 2, '08:00', '16:00', FALSE),
(3, 3, '08:00', '16:00', FALSE),
(3, 4, '08:00', '16:00', FALSE),
(3, 5, '08:00', '12:00', FALSE),
(3, 6, NULL, NULL, TRUE);
