"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";

function EditProfile() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [link, setLink] = useState<string>("");

  function handleSave() {
    setModalOpen(false);
  }

  return (
    <>
      <Button text="Edit profile" onclick={() => setModalOpen(true)} />
      <AnimatePresence>
        {modalOpen && (
          <Modal close={() => setModalOpen(false)}>
            <div className="p-5 flex flex-col gap-y-5">
              <h2 className="text-white text-xl text-center font-bold">Edit profile</h2>
              <label className="text-zinc-300 flex flex-col gap-y-1">
                Display name
                <Input value={name} setValue={setName} placeholder="Put your name here" />
              </label>
              <label className="text-zinc-300 flex flex-col gap-y-1">
                Bio
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Put some information about you here"
                  className="border-2 border-zinc-800 rounded-lg text-white px-4 py-2 resize-none outline-none h-25"
                />
              </label>
              <label className="text-zinc-300 flex flex-col gap-y-1">
                Link
                <Input value={link} setValue={setLink} placeholder="Put your website's URL here" />
              </label>
              <Button text="Save" onclick={handleSave} primary />
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

export default EditProfile;
