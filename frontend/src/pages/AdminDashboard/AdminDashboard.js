
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { useUser } from '../../context/UserContext';
import PermissionsList from '../../components/blogComponents/PermissionsList/PermissionsList';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { currentUser, isAdmin, mockUsers, updateUserRole } = useUser();
  const { blogs, permissionRequests, updatePermissionStatus } = useBlog();
  const navigate = useNavigate();
  
  // Redirect if not admin
  // if (!currentUser || !isAdmin()) {
  //   navigate('/');
  //   return null;
  // }
  
  const handleApproveRequest = (requestId) => {
    // Find the request
    const request = permissionRequests.find(req => req.id === requestId);
    if (!request) return;
    
    // Update the request status
    updatePermissionStatus(requestId, 'approved');
    
    // In a real app, this would also update the user's role in the database
    updateUserRole(request.userId, 'contributor');
  };
  
  const handleRejectRequest = (requestId) => {
    updatePermissionStatus(requestId, 'rejected');
  };
  
  return (
    <div className="app">
      <main>
        <section className="admin-dashboard">
          <div className="container">
            <h1>Admin Dashboard</h1>
            
            <div className="dashboard-grid">
              <div className="dashboard-card">
                <div className="dashboard-card-header">
                  <h2>Blog Stats</h2>
                </div>
                <div className="dashboard-card-body">
                  <div className="stats-grid">
                    <div className="stat-item">
                      <div className="stat-value">{blogs.length}</div>
                      <div className="stat-label">Total Posts</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">
                        {mockUsers.filter(user => user.role === 'contributor').length}
                      </div>
                      <div className="stat-label">Contributors</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">
                        {permissionRequests.filter(req => req.status === 'pending').length}
                      </div>
                      <div className="stat-label">Pending Requests</div>
                    </div>
                  </div>
                  
                  <div className="quick-actions">
                    <a href="/create" className="action-button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"></path>
                      </svg>
                      Write New Post
                    </a>
                    <a href="/blog" className="action-button secondary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5v14"></path>
                      </svg>
                      View All Posts
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="dashboard-card">
                <div className="dashboard-card-header">
                  <h2>Permission Requests</h2>
                </div>
                <div className="dashboard-card-body">
                  <PermissionsList 
                    requests={permissionRequests} 
                    onApprove={handleApproveRequest} 
                    onReject={handleRejectRequest} 
                  />
                </div>
              </div>
            </div>
            
            <div className="dashboard-card full-width">
              <div className="dashboard-card-header">
                <h2>Recent Blog Posts</h2>
              </div>
              <div className="dashboard-card-body">
                <div className="recent-posts-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.slice(0, 5).map((post) => {
                        const postDate = new Date(post.date);
                        return (
                          <tr key={post.id}>
                            <td className="post-title">{post.title}</td>
                            <td>{post.author?.name || 'Unknown'}</td>
                            <td>{post.category}</td>
                            <td>{postDate.toLocaleDateString()}</td>
                            <td className="post-actions">
                              <a href={`/blog/${post.id}`} className="table-action-button view">View</a>
                              <a href={`/edit/${post.id}`} className="table-action-button edit">Edit</a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;