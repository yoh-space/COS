"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  Box,
  Paper,
  Alert,
  CircularProgress,
  Typography,
  Divider,
} from '@mui/material';
import { useTheme } from 'next-themes';

interface BackgroundData {
  history?: {
    title: string;
    description: string[];
    programs: string;
  };
  programs?: {
    msc: string;
    phd: string;
    undergraduate: string;
  };
  students?: {
    total: number;
    regular: { ug: number; msc: number; phd: number };
    summer: { ug: number; msc: number };
  };
  staff?: {
    total: number;
    professors: number;
    associateProfessors: number;
    assistantProfessors: number;
    lecturers: number;
  };
  development?: {
    phdStudyLeave: number;
    postdoc: number;
    techAssistants: number;
  };
  research?: {
    ongoingProjects: number;
    internalProjects: number;
    externalProjects: number;
    communityProjects: number;
    laboratory: string;
  };
}

export default function BackgroundEditor() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [data, setData] = useState<BackgroundData>({});

  const { register, handleSubmit, reset } = useForm<BackgroundData>();

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

  // Fetch existing content
  useEffect(() => {
    async function fetchContent() {
      try {
        setFetching(true);
        const response = await fetch('/api/cms/background');
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
          console.error('API Error:', response.status, errorData);
          throw new Error(errorData.error || `Failed to fetch background content (${response.status})`);
        }

        const result = await response.json();
        console.log('Fetched data:', result);
        
        if (result.content) {
          try {
            const parsed = JSON.parse(result.content);
            setData(parsed);
            reset(parsed);
          } catch (e) {
            console.error('Error parsing content:', e);
            setError('Failed to parse content data');
          }
        } else {
          // No content yet, use empty data
          console.log('No content found, using empty data');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch content');
      } finally {
        setFetching(false);
      }
    }

    fetchContent();
  }, [reset]);

  async function onSubmit(formData: BackgroundData) {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const response = await fetch('/api/cms/background', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: JSON.stringify(formData) }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save background content');
      }

      setSuccess('Background content saved successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save content');
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        bgcolor: theme === 'dark' ? '#181A20' : '#ffffff',
        color: theme === 'dark' ? '#fff' : 'inherit',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {error && (
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" onClose={() => setSuccess(null)}>
              {success}
            </Alert>
          )}

          {/* History Section */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: theme === 'dark' ? '#fff' : 'inherit' }}>
              History & Evolution
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Title"
                {...register('history.title')}
                defaultValue={data.history?.title}
                fullWidth
                sx={textFieldStyles}
              />
              <TextField
                label="Description Paragraph 1"
                {...register('history.description.0')}
                defaultValue={data.history?.description?.[0]}
                multiline
                rows={3}
                fullWidth
                sx={textFieldStyles}
              />
              <TextField
                label="Description Paragraph 2"
                {...register('history.description.1')}
                defaultValue={data.history?.description?.[1]}
                multiline
                rows={2}
                fullWidth
                sx={textFieldStyles}
              />
              <TextField
                label="Programs List"
                {...register('history.programs')}
                defaultValue={data.history?.programs}
                fullWidth
                sx={textFieldStyles}
              />
            </Box>
          </Box>

          <Divider />

          {/* Programs Section */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: theme === 'dark' ? '#fff' : 'inherit' }}>
              Academic Programs
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
              <TextField
                label="MSc Programs"
                {...register('programs.msc')}
                defaultValue={data.programs?.msc}
                fullWidth
                sx={textFieldStyles}
              />
              <TextField
                label="PhD Programs"
                {...register('programs.phd')}
                defaultValue={data.programs?.phd}
                fullWidth
                sx={textFieldStyles}
              />
              <TextField
                label="Undergraduate Programs"
                {...register('programs.undergraduate')}
                defaultValue={data.programs?.undergraduate}
                fullWidth
                sx={textFieldStyles}
              />
            </Box>
          </Box>

          <Divider />

          {/* Students Section */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: theme === 'dark' ? '#fff' : 'inherit' }}>
              Student Population
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
              <TextField
                label="Total Students"
                {...register('students.total', { valueAsNumber: true })}
                defaultValue={data.students?.total}
                type="number"
                fullWidth
                sx={textFieldStyles}
              />
              <TextField
                label="Regular UG"
                {...register('students.regular.ug', { valueAsNumber: true })}
                defaultValue={data.students?.regular?.ug}
                type="number"
                fullWidth
                sx={textFieldStyles}
              />
              <TextField
                label="Regular MSc"
                {...register('students.regular.msc', { valueAsNumber: true })}
                defaultValue={data.students?.regular?.msc}
                type="number"
                fullWidth
                sx={textFieldStyles}
              />
              <TextField
                label="Regular PhD"
                {...register('students.regular.phd', { valueAsNumber: true })}
                defaultValue={data.students?.regular?.phd}
                type="number"
                fullWidth
                sx={textFieldStyles}
              />
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2, mt: 2 }}>
              <TextField
                label="Summer UG"
                {...register('students.summer.ug', { valueAsNumber: true })}
                defaultValue={data.students?.summer?.ug}
                type="number"
                fullWidth
                sx={textFieldStyles}
              />
              <TextField
                label="Summer MSc"
                {...register('students.summer.msc', { valueAsNumber: true })}
                defaultValue={data.students?.summer?.msc}
                type="number"
                fullWidth
                sx={textFieldStyles}
              />
            </Box>
          </Box>

          <Divider />

          {/* Staff Section */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: theme === 'dark' ? '#fff' : 'inherit' }}>
              Staff Profile
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
              <TextField
                label="Total Staff"
                {...register('staff.total', { valueAsNumber: true })}
                defaultValue={data.staff?.total}
                type="number"
                fullWidth
                sx={textFieldStyles}
              />
              <TextField
                label="Professors"
                {...register('staff.professors', { valueAsNumber: true })}
                defaultValue={data.staff?.professors}
                type="number"
                fullWidth
                sx={textFieldStyles}
              />
              <TextField
                label="Associate Professors"
                {...register('staff.associateProfessors', { valueAsNumber: true })}
                defaultValue={data.staff?.associateProfessors}
                type="number"
                fullWidth
                sx={textFieldStyles}
              />
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2, mt: 2 }}>
              <TextField
                label="Assistant Professors"
                {...register('staff.assistantProfessors', { valueAsNumber: true })}
                defaultValue={data.staff?.assistantProfessors}
                type="number"
                fullWidth
                sx={textFieldStyles}
              />
              <TextField
                label="Lecturers"
                {...register('staff.lecturers', { valueAsNumber: true })}
                defaultValue={data.staff?.lecturers}
                type="number"
                fullWidth
                sx={textFieldStyles}
              />
            </Box>
          </Box>

          <Divider />

          {/* Development Section */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: theme === 'dark' ? '#fff' : 'inherit' }}>
              Staff Development
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
              <TextField
                label="PhD Study Leave"
                {...register('development.phdStudyLeave', { valueAsNumber: true })}
                defaultValue={data.development?.phdStudyLeave}
                type="number"
                fullWidth
                sx={textFieldStyles}
              />
              <TextField
                label="Postdoc Pursuits"
                {...register('development.postdoc', { valueAsNumber: true })}
                defaultValue={data.development?.postdoc}
                type="number"
                fullWidth
                sx={textFieldStyles}
              />
              <TextField
                label="Tech Assistants"
                {...register('development.techAssistants', { valueAsNumber: true })}
                defaultValue={data.development?.techAssistants}
                type="number"
                fullWidth
                sx={textFieldStyles}
              />
            </Box>
          </Box>

          <Divider />

          {/* Research Section */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: theme === 'dark' ? '#fff' : 'inherit' }}>
              Research & Community
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
              <TextField
                label="Ongoing Projects"
                {...register('research.ongoingProjects', { valueAsNumber: true })}
                defaultValue={data.research?.ongoingProjects}
                type="number"
                fullWidth
                sx={textFieldStyles}
              />
              <TextField
                label="Internal Projects"
                {...register('research.internalProjects', { valueAsNumber: true })}
                defaultValue={data.research?.internalProjects}
                type="number"
                fullWidth
                sx={textFieldStyles}
              />
              <TextField
                label="External Projects"
                {...register('research.externalProjects', { valueAsNumber: true })}
                defaultValue={data.research?.externalProjects}
                type="number"
                fullWidth
                sx={textFieldStyles}
              />
              <TextField
                label="Community Projects"
                {...register('research.communityProjects', { valueAsNumber: true })}
                defaultValue={data.research?.communityProjects}
                type="number"
                fullWidth
                sx={textFieldStyles}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <TextField
                label="Laboratory Name"
                {...register('research.laboratory')}
                defaultValue={data.research?.laboratory}
                fullWidth
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
              sx={{ minWidth: 120 }}
            >
              {loading ? 'Saving...' : 'Save Content'}
            </Button>

            <Button
              variant="outlined"
              onClick={() => window.location.href = '/about/background'}
              disabled={loading}
            >
              Preview Page
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
}
