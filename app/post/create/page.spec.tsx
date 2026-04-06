import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostCreatePage from './page';
import { postRequest } from '../../../lib/api.service';
import { showToast } from 'nextjs-toast-notify';
import { useRouter } from 'next/navigation';

jest.mock('../../../lib/api.service', () => ({
  postRequest: jest.fn(),
}));

jest.mock('nextjs-toast-notify', () => ({
  showToast: {
    warning: jest.fn(),
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../_components/sidebar.component', () => () => <div>Sidebar</div>);

describe('PostCreatePage', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    jest.clearAllMocks();
    localStorage.setItem('token', 'mock-token');
  });

  it('renders correctly', () => {
    render(<PostCreatePage />);
    expect(screen.getByText('Create Post')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Content')).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();
  });

  it('updates input values on change', () => {
    render(<PostCreatePage />);
    const titleInput = screen.getByPlaceholderText('Title') as HTMLInputElement;
    const contentInput = screen.getByPlaceholderText('Content') as HTMLTextAreaElement;

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(contentInput, { target: { value: 'Test Content' } });

    expect(titleInput.value).toBe('Test Title');
    expect(contentInput.value).toBe('Test Content');
  });

  it('shows warning if fields are empty on submit', async () => {
    render(<PostCreatePage />);
    const submitButton = screen.getByText('Create');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(showToast.warning).toHaveBeenCalledWith('Please fill in all fields');
    });
  });

  it('submits form successfully and navigates', async () => {
    (postRequest as jest.Mock).mockResolvedValue({ id: 1 });

    render(<PostCreatePage />);
    const titleInput = screen.getByPlaceholderText('Title');
    const contentInput = screen.getByPlaceholderText('Content');
    const submitButton = screen.getByText('Create');

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(contentInput, { target: { value: 'Test Content' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(postRequest).toHaveBeenCalledWith('/posts', 'mock-token', {
        title: 'Test Title',
        content: 'Test Content',
      });
      expect(showToast.success).toHaveBeenCalledWith('Post created successfully');
      expect(pushMock).toHaveBeenCalledWith('/post');
    });
  });

  it('shows error if creation fails', async () => {
    (postRequest as jest.Mock).mockResolvedValue(null);

    render(<PostCreatePage />);
    const titleInput = screen.getByPlaceholderText('Title');
    const contentInput = screen.getByPlaceholderText('Content');
    const submitButton = screen.getByText('Create');

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(contentInput, { target: { value: 'Test Content' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(showToast.error).toHaveBeenCalledWith('Failed to create post');
      expect(pushMock).not.toHaveBeenCalled();
    });
  });
});