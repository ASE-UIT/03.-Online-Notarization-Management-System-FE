import './App.css';
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import getDesignTokens from './config/theme/themePrimitives';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import UserService from './services/user.service';
import TokenService from './services/token.service';
import Cookies from 'js-cookie';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { setUser } from './stores/slices/userSlice';
import Settings from './pages/admin/Settings';
import ThirdParty from './pages/static/Loader';
import Loader from './components/Loader';

const Home = lazy(() => import('./pages/home/Home'));
const Services = lazy(() => import('./pages/services/Services'));
const SignIn = lazy(() => import('./pages/signin/SignIn'));
const SignUp = lazy(() => import('./pages/signup/SignUp'));
const UserProfile = lazy(() => import('./pages/profile/UserProfile'));
const CreateNotarizationProfile = lazy(
  () => import('./pages/services/create-notarization-profile/CreateNotarizationProfile'),
);
const LookupNotarizationProfile = lazy(() => import('./pages/services/LookupNotarizationProfile'));
const HistoryNotarizationProfile = lazy(() => import('./pages/services/HistoryNotarizationProfile'));
const CreateNotarizationSession = lazy(() => import('./pages/services/CreateNotarizationSession'));
const UserGuide = lazy(() => import('./pages/static/UserGuide'));
const NotFound = lazy(() => import('./pages/notfound/NotFound'));
const EmployeeManagement = lazy(() => import('./pages/admin/employee-management/EmployeeManagement'));
const AdminDashboard = lazy(() => import('./pages/admin/dashboard/AdminDashboard'));
const UserManagement = lazy(() => import('./pages/admin/user-management/UserManagement'));
const NotaryManagement = lazy(() => import('./pages/admin/notary-management/NotaryManagement'));
const NotaryDashboard = lazy(() => import('./pages/notary/NotaryDashboard'));
const DocumentWallet = lazy(() => import('./pages/services/DocumentWallet'));
const ProcessingNotarizationDocuments = lazy(() => import('./pages/notary/ProcessingNotarizationDocuments'));
const NotarizationHistory = lazy(() => import('./pages/notary/NotarizedHistory'));
const AwaitingSignatureDocuments = lazy(() => import('./pages/notary/AwaitingSignatureDocuments'));
const ForgotPassword = lazy(() => import('./pages/signin/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/signin/ResetPassword'));
const SessionManagement = lazy(() => import('./pages/notary/SessionManagement'));

function App() {
  const dispatch = useDispatch();
  const theme = createTheme(getDesignTokens());
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { token, refreshToken } = TokenService.getAccessTokenFromURL(window.location.search);
  const resetPasswordToken = TokenService.getResetPasswordTokenFromURL(window.location.search);

  useEffect(() => {
    const fetchUser = async () => {
      if (token && refreshToken) {
        Cookies.set('accessToken', token);
        Cookies.set('refreshToken', refreshToken);
        try {
          const user = await UserService.getUserById(TokenService.decodeToken(token).sub);
          dispatch(setUser(user));
          window.history.replaceState({}, document.title, window.location.pathname);
          window.location.reload();
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      }
    };

    fetchUser();
  }, [token, refreshToken, dispatch]);

  useEffect(() => {
    if (resetPasswordToken) {
      Cookies.set('resetPasswordToken', resetPasswordToken);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <ThemeProvider theme={theme}>
        <Box display={'flex'}>
          {isAuthenticated && <Sidebar />}
          <Box flex={1}>
            {!isAuthenticated && <Header />}
            <Routes>
              {/* Public Routes */}
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <Home />
                  </PublicRoute>
                }
              />
              <Route
                path="/services"
                element={
                  <PublicRoute>
                    <Services />
                  </PublicRoute>
                }
              />
              <Route
                path="/lookup"
                element={
                  <PublicRoute>
                    <LookupNotarizationProfile />
                  </PublicRoute>
                }
              />
              <Route
                path="/user-guide"
                element={
                  <PublicRoute>
                    <UserGuide />
                  </PublicRoute>
                }
              />
              <Route
                path="/signin"
                element={
                  <PublicRoute>
                    <SignIn />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <SignUp />
                  </PublicRoute>
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <PublicRoute>
                    <ForgotPassword />
                  </PublicRoute>
                }
              />
              <Route
                path="/reset-password"
                element={
                  <PublicRoute>
                    <ResetPassword />
                  </PublicRoute>
                }
              />
              <Route
                path="/third-party"
                element={
                  <PublicRoute>
                    <Loader />
                  </PublicRoute>
                }
              />

              {/* Auth Routes */}
              <Route path="/signin" element={<PublicRoute element={<SignIn />} />} />
              <Route path="/signup" element={<PublicRoute element={<SignUp />} />} />
              <Route path="/forgot-password" element={<PublicRoute element={<ForgotPassword />} />} />
              <Route path="/reset-password" element={<PublicRoute element={<ResetPassword />} />} />

              {/* User Routes */}
              <Route element={<PrivateRoute allowedRoles={['user']} />}>
                <Route path="/user/create-notarization-profile" element={<CreateNotarizationProfile />} />
                <Route path="/user/history" element={<HistoryNotarizationProfile />} />
                <Route path="/user/document-wallet" element={<DocumentWallet />} />
                <Route path="/user/notarization-session" element={<CreateNotarizationSession />} />
              </Route>

              {/* Admin Routes */}
              <Route element={<PrivateRoute allowedRoles={['admin']} />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/employee-management" element={<EmployeeManagement />} />
                <Route path="/admin/user-management" element={<UserManagement />} />
                <Route path="/admin/notary-management" element={<NotaryManagement />} />
                <Route path="/admin/settings" element={<Settings />} />
              </Route>

              {/* Secretary Routes */}
              <Route element={<PrivateRoute allowedRoles={['secretary']} />}>
                <Route path="/secretary/dashboard" element={<></>} />
                <Route path="/secretary/employee-management" element={<></>} />
                <Route path="/secretary/user-management" element={<></>} />
                <Route path="/secretary/notary-management" element={<></>} />
                <Route path="/secretary/notary-session-management" element={<></>} />
              </Route>

              {/* Notary Routes */}
              <Route element={<PrivateRoute allowedRoles={['notary']} />}>
                <Route path="/secretary/dashboard" element={<></>} />
                <Route path="/secretary/employee-management" element={<></>} />
                <Route path="/secretary/user-management" element={<></>} />
                <Route path="/secretary/notary-management" element={<></>} />
                <Route path="/secretary/notary-session-management" element={<></>} />
              </Route>

              {/* Profile Routes */}
              <Route element={<PrivateRoute allowedRoles={['user', 'admin', 'secretary', 'notary']} />}>
                <Route path="/profile" element={<UserProfile />} />
              </Route>

              {/* Notary Routes */}
              <Route element={<PrivateRoute allowedRoles={['notary']} />}>
                <Route path="/notary/dashboard" element={<NotaryDashboard />} />
                <Route path="/notary/pending-notarization-documents" element={<ProcessingNotarizationDocuments />} />
                <Route path="/notary/notarization-history" element={<NotarizationHistory />} />
                <Route path="/notary/awaiting-signature-documents" element={<AwaitingSignatureDocuments />} />
                <Route path="/notary/notary-session-management" element={<SessionManagement />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
            {!isAuthenticated && <Footer />}
          </Box>
        </Box>
        <ToastContainer position="bottom-right" autoClose={2500} newestOnTop rtl={false} pauseOnFocusLoss pauseOnHover />
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
