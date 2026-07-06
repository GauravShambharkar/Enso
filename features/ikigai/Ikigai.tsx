"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus, Eye, Compass, HelpCircle } from "lucide-react";
import { useIkigai } from "./hooks/controller/useIkigai.hook";
import CreateIkigaiModal from "./components/modal/CreateIkigaiModal";
import ViewIkigaiModal from "./components/modal/ViewIkigaiModal";

export const Ikigai = () => {
  const {
    profiles,
    selectedProfile,
    setSelectedProfile,
    createModal,
    setCreateModal,
    viewModal,
    setViewModal,
    currentStep,
    inputs,
    handleInputChange,
    handleNext,
    handleBack,
    handleResetWizard,
    handleDeleteProfile,
    handleViewProfile
  } = useIkigai();

  return (
    <div className="flex flex-col gap-6 relative min-h-screen pb-20 text-white">
      {/* Title Header matching Idea-Vault */}
      <div className="w-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-medium text-white"
        >
          Ikigai
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="w-full text-white/70 text-sm mt-1"
        >
          dashboards
        </motion.div>
      </div>

      <div className="w-full space-y-6">
        {/* Create Button matching Idea-Vault */}
        <div className="flex justify-end">
          <button
            onClick={() => setCreateModal(true)}
            className="cursor-pointer hover:bg-white/10 transition-all ease-in-out duration-300 text-white flex items-center gap-2 border px-4 py-1.5 rounded-lg bg-black/50 border-white/30 shadow-sm shadow-white/30 text-sm font-light"
          >
            <Plus className="size-4" />
            Discover Purpose
          </button>
        </div>

        {/* Saved Profiles Table - Unified view matching Idea-Vault */}
        <div className="w-full space-y-4">
          <div className="flex items-center gap-2 text-white/80">
            <Compass className="size-5" />
            <h3 className="text-lg font-light">Saved Ikigai Profiles</h3>
          </div>
          
          <div className="w-full border border-white/20 bg-white/10 backdrop-blur-xl rounded-lg overflow-hidden max-h-120 overflow-y-auto">
            <table className="w-full table-fixed border-collapse text-white">
              <thead className="sticky top-0 left-0 right-0 z-10 bg-black text-sm">
                <tr>
                  <th className="border border-white/20 px-4 py-2.5 text-left font-thin w-[55%]">Synthesized Core Concept</th>
                  <th className="border border-white/20 px-4 py-2.5 text-left font-thin w-[25%]">Created On</th>
                  <th className="border border-white/20 px-4 py-2.5 text-left font-thin w-[20%]">Actions</th>
                </tr>
              </thead>

              <tbody>
                {profiles.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="border border-white/20 px-4 py-8 text-center text-white/50 font-light text-sm italic">
                      No Ikigai profiles created yet. Click "Discover Purpose" to start.
                    </td>
                  </tr>
                ) : (
                  profiles.map((p) => (
                    <tr key={p.id} className="hover:bg-white/5 transition group text-sm">
                      <td className="border border-white/20 px-4 py-2">
                        <span className="truncate block max-w-full font-light">
                          {p.result.ikigaiSummary}
                        </span>
                      </td>
                      <td className="border border-white/20 px-4 py-2">
                        <span className="text-white/70 font-light">{p.createdOn}</span>
                      </td>
                      <td className="border border-white/20 px-4 py-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewProfile(p)}
                            className="inline-flex cursor-pointer hover:bg-white/10 transition-all duration-300 text-xs text-white items-center gap-1.5 border px-3 py-1 rounded-md bg-black/50 border-white/30"
                          >
                            <Eye className="size-3" />
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Small Philosophy Explainer Card */}
        <div className="p-6 rounded-2xl border border-white/10 bg-black/40 flex items-start gap-4">
          <HelpCircle className="size-6 text-[#977DD3] flex-none mt-1" />
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-white">How Ikigai Works</h4>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              By mapping the overlaps of what you love, your skills, societal needs, and economic drivers, Ikigai reveals a unified view of your career mission, passion, profession, and vocation. Click "Discover Purpose" to run the guided wizard.
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      {createModal && (
        <CreateIkigaiModal
          onClose={handleResetWizard}
          currentStep={currentStep}
          inputs={inputs}
          handlers={{
            onChange: handleInputChange,
            onNext: handleNext,
            onBack: handleBack
          }}
        />
      )}

      {viewModal && selectedProfile && (
        <ViewIkigaiModal
          profile={selectedProfile}
          onClose={() => {
            setViewModal(false);
            setSelectedProfile(null);
          }}
          onDelete={handleDeleteProfile}
        />
      )}
    </div>
  );
};

export default Ikigai;