"use client";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { useTheme } from "next-themes";
import { useFormContext } from "react-hook-form";
import React from "react";

interface AdminDashboardFormProps {
  editing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancelEdit: () => void;
  loading?: boolean;
}

export default function AdminDashboardForm({
  editing,
  onSubmit,
  onCancelEdit,
  loading = false,
}: AdminDashboardFormProps) {
  const { theme } = useTheme();
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const content = watch("content") || "";

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

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        bgcolor: theme === "dark" ? '#181A20' : '#ffffff',
        color: theme === "dark" ? '#fff' : 'inherit',
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mb: 3, color: theme === "dark" ? '#fff' : 'inherit' }}
      >
        {editing ? "Edit Post" : "Create New Post"}
      </Typography>

      <form onSubmit={onSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="Title"
            {...register("title", { required: "Title is required" })}
            error={!!errors.title}
            helperText={errors.title?.message as string}
            fullWidth
            sx={textFieldStyles}
          />

          <TextField
            label="Content"
            {...register("content", { required: "Content is required" })}
            error={!!errors.content}
            helperText={errors.content?.message as string}
            multiline
            rows={6}
            fullWidth
            sx={textFieldStyles}
          />

          <TextField
            label="Excerpt"
            {...register("excerpt", { required: "Excerpt is required" })}
            error={!!errors.excerpt}
            helperText={errors.excerpt?.message as string}
            multiline
            rows={3}
            fullWidth
            sx={textFieldStyles}
          />

          <TextField
            label="Author"
            {...register("author", { required: "Author is required" })}
            error={!!errors.author}
            helperText={errors.author?.message as string}
            fullWidth
            sx={textFieldStyles}
          />

          <TextField
            label="Image URL"
            {...register("image_url")}
            fullWidth
            sx={textFieldStyles}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Category"
              {...register("category", { required: "Category is required" })}
              error={!!errors.category}
              helperText={errors.category?.message as string}
              fullWidth
              sx={textFieldStyles}
            />
            <TextField
              label="Slug (URL)"
              {...register("slug", { required: "Slug is required" })}
              error={!!errors.slug}
              helperText={errors.slug?.message as string}
              fullWidth
              sx={textFieldStyles}
            />
          </Box>

          <TextField
            label="Tags (comma separated)"
            {...register("tags")}
            fullWidth
            sx={textFieldStyles}
          />

          <TextField
            label="Updated Time"
            type="datetime-local"
            {...register("updatedTime", { required: "Updated time is required" })}
            error={!!errors.updatedTime}
            helperText={errors.updatedTime?.message as string}
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={textFieldStyles}
          />

          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ minWidth: 120 }}
            >
              {loading ? "Saving..." : editing ? "Update Post" : "Publish Post"}
            </Button>

            {editing && (
              <Button
                variant="outlined"
                onClick={onCancelEdit}
                disabled={loading}
              >
                Cancel Edit
              </Button>
            )}
          </Box>
        </Box>
      </form>
    </Paper>
  );
}