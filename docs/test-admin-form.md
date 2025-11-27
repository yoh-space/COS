# Admin Dashboard Form Testing Guide

## Test Cases for New Fields (excerpt, category, slug)

### 1. Create New Post Test
- Navigate to admin dashboard
- Click "Create New Post"
- Fill in all required fields:
  - Title: "Test Blog Post"
  - Excerpt: "This is a test excerpt for SEO"
  - Category: "Technology"
  - Slug: "test-blog-post" (should auto-generate from title)
  - Author: "Test Author"
  - Content: Add some content blocks
- Submit form
- Verify post is created with all fields

### 2. Edit Existing Post Test
- Click "Edit" on an existing post
- Verify all fields are pre-filled including excerpt, category, slug
- Modify excerpt, category, or slug
- Submit changes
- Verify updates are saved

### 3. Slug Uniqueness Test
- Try to create two posts with the same slug
- Should show error: "A post with this slug already exists"

### 4. Required Fields Validation
- Try to submit form without:
  - Excerpt (should show validation error)
  - Category (should show validation error)  
  - Slug (should show validation error)

### 5. Auto Slug Generation Test
- Enter a title like "My Amazing Blog Post!"
- Slug should auto-generate as "my-amazing-blog-post"
- Special characters should be removed/converted

### 6. Backend Query Tests
- Test getPostBySlug with a valid slug
- Test getPostsByCategory with a valid category
- Test search functionality includes excerpt in results

## Expected Behavior
- All new fields should be properly saved to database
- Form validation should work for required fields
- Slug uniqueness should be enforced
- Auto-generation of slugs should work
- Edit mode should pre-fill all fields correctly