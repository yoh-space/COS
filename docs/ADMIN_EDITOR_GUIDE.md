# Admin Blog Editor - User Guide

## Overview
The admin dashboard has been redesigned with a modern, clean interface and a powerful rich text editor for creating blog posts.

## New Features

### 🎨 Modern Design
- **Gradient Header**: Eye-catching gradient header with emojis for visual appeal
- **Clean Form Layout**: Spacious, well-organized form fields with clear labels
- **Improved Typography**: Better font hierarchy and spacing
- **Enhanced Visual Feedback**: Smooth transitions and hover effects

### ✍️ Rich Text Editor
The content editor now features a Microsoft Word-like interface with the following capabilities:

#### Content Block Types
1. **Paragraph** - Standard text content
2. **Heading** - H1 through H6 headings with level selector
3. **Bullet List** - Unordered lists with add/remove items
4. **Numbered List** - Ordered lists with automatic numbering
5. **Code Block** - Syntax-highlighted code with language specification
6. **Image** - Embedded images with URL and alt text
7. **Link** - Hyperlinks with custom text
8. **Divider** - Horizontal rules for content separation
9. **Table** - Dynamic tables with custom headers and rows

#### Editor Features
- **Block Management**: Easy add, remove, and reorder blocks
- **Visual Toolbar**: Quick access to all content types
- **Block Counter**: Shows total number of content blocks
- **Drag to Reorder**: Move blocks up/down with arrow buttons
- **Live Preview**: See image and link previews as you type
- **Active Block Highlighting**: Visual indicator for the selected block

### 📝 Form Improvements
- **Auto-slug Generation**: URL slugs are automatically generated from titles
- **Character Counter**: Track excerpt length in real-time
- **Better Input Styling**: Larger, more accessible form fields
- **Visual Hierarchy**: Clear section separation with proper spacing
- **Enhanced Buttons**: Gradient buttons with icons and hover effects

## How to Use

### Creating a New Post
1. Click "Create New Post" button
2. Fill in the post title (slug auto-generates)
3. Add category and excerpt
4. Use the rich text editor toolbar to add content blocks
5. Fill in author name and optional featured image
6. Add tags (comma-separated)
7. Click "🚀 Publish Post"

### Editing Content Blocks
1. Click on any block to activate it
2. Use the dropdown to change block type
3. Use ↑/↓ buttons to reorder blocks
4. Click 🗑️ to delete a block
5. Each block type has specific fields:
   - **Paragraph**: Multi-line text area
   - **Heading**: Text input + level selector (H1-H6)
   - **Lists**: Add/remove individual items
   - **Code**: Language input + code textarea
   - **Image**: URL + alt text with live preview
   - **Table**: Dynamic headers and rows

### Editing Existing Posts
1. Go to "All Posts" tab
2. Click "Edit" on any post card
3. Make your changes in the form
4. Click "💾 Update Post" or "✕ Cancel"

## Technical Details

### Components
- **Main Page**: `src/app/asdfjlk/page.tsx`
- **Rich Text Editor**: `src/components/RichTextEditor.tsx`

### Block Data Structure
Each content block is stored as a typed object:
```typescript
type Block =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level?: number }
  | { type: "code"; code: string; language?: string }
  | { type: "image"; url: string; alt?: string }
  | { type: "bulletine"; items: string[] }
  | { type: "orderedList"; items: string[] }
  | { type: "divider" }
  | { type: "link"; url: string; text: string }
  | { type: "table"; headers: string[]; rows: string[][] };
```

### Styling
- Uses Tailwind CSS for all styling
- Supports dark mode throughout
- Responsive design for mobile and desktop
- Smooth transitions and animations

## Tips
- Use headings to structure your content hierarchically
- Add alt text to images for better SEO and accessibility
- Preview your post before publishing
- Use code blocks for technical content with proper language tags
- Keep excerpts concise (150-200 characters recommended)
- Use descriptive slugs for better URLs

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Dark mode compatible
