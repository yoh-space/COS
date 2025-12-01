"use client";

import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from '@mui/material';
import { useTheme } from 'next-themes';
import RichTextEditor from '@/components/RichTextEditor';

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

interface BlogPostFormData {
  title: string;
  slug?: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  status: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

interface BlogPostFormProps {
  blogPost?: any;
}

export default function BlogPostForm({ blogPost }: BlogPostFormProps) {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [contentBlocks, setContentBlocks] = useState<Block[]>([]);

  const methods = useForm<BlogPostFormData>({
    defaultValues: {
      title: blogPost?.title || '',
      slug: blogPost?.slug || '',
      content: blogPost?.content || '',
      excerpt: blogPost?.excerpt || '',
      featuredImage: blogPost?.featuredImage || '',
      status: blogPost?.status || 'draft',
      seoTitle: blogPost?.seoTitle || '',
      seoDescription: blogPost?.seoDescription || '',
      seoKeywords: blogPost?.seoKeywords || '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = methods;

  // Parse content blocks from JSON if editing
  useEffect(() => {
    if (blogPost?.content) {
      try {
        const parsed = JSON.parse(blogPost.content);
        if (Array.isArray(parsed)) {
          setContentBlocks(parsed);
        }
      } catch (e) {
        // If content is not JSON, create a single paragraph block
        setContentBlocks([{ type: 'paragraph', text: blogPost.content }]);
      }
    }
  }, [blogPost]);

  // Update form content when blocks change
  useEffect(() => {
    setValue('content', JSON.stringify(contentBlocks));
  }, [contentBlocks, setValue]);

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme === 'dark' ? '#444' : '#ccc',
      },
      '&:hover fieldset': {
        borderColor: theme === 'dark' ? '#888' : '#999',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#6366F1',
      },
    },
    '& .MuiInputLabel-root': {
      color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
    },
    '& .MuiInputBase-input': {
      color: theme === 'dark' ? '#fff' : '#000',
    },
  };

  async function onSubmit(data: BlogPostFormData) {
    try {
      setLoading(true);

      const url = blogPost
        ? `/api/cms/blog/${blogPost.id}`
        : '/api/cms/blog';

      const method = blogPost ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save blog post');
      }

      // Redirect to blog list on success
      window.location.href = '/admin/blog';
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to save blog post');
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormProvider {...methods}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          bgcolor: theme === 'dark' ? '#181A20' : '#ffffff',
          color: theme === 'dark' ? '#fff' : 'inherit',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Title */}
            <TextField
              label="Title"
              {...register('title', { required: 'Title is required' })}
              error={!!errors.title}
              helperText={errors.title?.message}
              fullWidth
              sx={textFieldStyles}
            />

            {/* Slug */}
            <TextField
              label="Slug (URL-friendly identifier)"
              {...register('slug')}
              error={!!errors.slug}
              helperText={errors.slug?.message || 'Leave empty to auto-generate from title'}
              fullWidth
              sx={textFieldStyles}
            />

            {/* Rich Text Editor */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ mb: 1, color: theme === 'dark' ? '#fff' : 'inherit' }}
              >
                Content *
              </Typography>
              <RichTextEditor
                content={contentBlocks}
                onChange={setContentBlocks}
              />
              {errors.content && (
                <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                  {errors.content.message}
                </Typography>
              )}
            </Box>

            {/* Excerpt */}
            <TextField
              label="Excerpt"
              {...register('excerpt')}
              multiline
              rows={3}
              fullWidth
              helperText="A short summary of the blog post"
              sx={textFieldStyles}
            />

            {/* Featured Image */}
            <TextField
              label="Featured Image URL"
              {...register('featuredImage')}
              fullWidth
              helperText="URL of the featured image for this post"
              sx={textFieldStyles}
            />

            {/* Status */}
            <FormControl fullWidth sx={textFieldStyles}>
              <InputLabel>Status</InputLabel>
              <Select
                {...register('status', { required: 'Status is required' })}
                defaultValue={watch('status')}
                label="Status"
                error={!!errors.status}
              >
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="pending_review">Pending Review</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="archived">Archived</MenuItem>
              </Select>
              {errors.status && (
                <FormHelperText error>{errors.status.message}</FormHelperText>
              )}
            </FormControl>

            {/* SEO Section */}
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="h6"
                sx={{ mb: 2, color: theme === 'dark' ? '#fff' : 'inherit' }}
              >
                SEO Metadata
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="SEO Title"
                  {...register('seoTitle')}
                  fullWidth
                  helperText="Title for search engines (leave empty to use post title)"
                  sx={textFieldStyles}
                />

                <TextField
                  label="SEO Description"
                  {...register('seoDescription')}
                  multiline
                  rows={2}
                  fullWidth
                  helperText="Description for search engines"
                  sx={textFieldStyles}
                />

                <TextField
                  label="SEO Keywords"
                  {...register('seoKeywords')}
                  fullWidth
                  helperText="Comma-separated keywords for search engines"
                  sx={textFieldStyles}
                />
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  minWidth: 120,
                  bgcolor: blogPost ? '#2563eb' : '#16a34a',
                  '&:hover': {
                    bgcolor: blogPost ? '#1d4ed8' : '#15803d',
                  },
                }}
              >
                {loading ? 'Saving...' : blogPost ? 'Update Post' : 'Create Post'}
              </Button>

              <Button
                variant="outlined"
                onClick={() => window.location.href = '/admin/blog'}
                disabled={loading}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </FormProvider>
  );
}
