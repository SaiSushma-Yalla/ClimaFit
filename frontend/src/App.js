import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import RecommendationPage from "./pages/RecommendationPage";

import ProtectedRoute from "./components/ProtectedRoute";
import RecommendationForm from "./components/RecommendationForm";
import CreateOutfitForm from "./components/CreateOutfitForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-outfit"
          element={
            <ProtectedRoute>
              <CreateOutfitForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recommend"
          element={
            <ProtectedRoute>
              <RecommendationForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
