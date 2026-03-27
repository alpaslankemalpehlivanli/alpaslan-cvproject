"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, Download } from "lucide-react";
import { Books } from "./books";
import s from "./home-client.module.css";

/*
 * Centering approach: a spacer div sits above the header.
 * In intro phase the spacer pushes the header to ~50vh.
 * On enter, the spacer animates to height:0, causing the header
 * to rise smoothly to the top — no layout animation flicker.
 */
const SPACER_INTRO = "calc(38vh - 110px)";

export function HomeClient() {
  const [entered, setEntered] = useState(false);

  return (
    <div className={s.root}>
      {/* Collapses to slide header from center to top */}
      <motion.div
        aria-hidden="true"
        className={s.spacer}
        initial={{ height: SPACER_INTRO }}
        animate={{ height: entered ? 0 : SPACER_INTRO }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />

      <header className={s.header}>
        <div className={s.panel}>
          <h1 className={s.name}>
            {"ALPASLAN KEMAL PEHLİVANLI"}
          </h1>
          <div className={s.roleBadge}>
            <span className={s.roleText}>GAME DESIGNER</span>
          </div>

          {/* CV download — slapped onto the panel after entering */}
          <AnimatePresence>
            {entered && (
              <motion.a
                key="cv-tag"
                href="/Alpaslan Kemal Game Design CV.pdf"
                download
                className={s.cvDownloadBtn}
                aria-label="Download CV"
                initial={{ opacity: 0, x: 32, y: -16, rotate: -20, scale: 0.82 }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: -10, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.15 } }}
                transition={{ type: "spring", stiffness: 170, damping: 15, delay: 0.9 }}
                whileHover={{
                  rotate: -5,
                  scale: 1.08,
                  transition: { type: "spring", stiffness: 380, damping: 20 },
                }}
                whileTap={{ scale: 0.93, rotate: -14 }}
              >
                <Download size={12} strokeWidth={2} aria-hidden="true" />
                <span>CV</span>
              </motion.a>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className={s.main}>
        <AnimatePresence mode="wait">
          {!entered ? (
            <motion.div
              key="cta"
              className={s.ctaWrap}
              variants={{
                hidden:  { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1.0, delay: 0.72, ease: [0.22, 1, 0.36, 1] },
                },
                exit: {
                  opacity: 0,
                  y: -14,
                  scale: 0.95,
                  transition: { duration: 0.3, ease: "easeIn" },
                },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button className={s.enterBtn} onClick={() => setEntered(true)}>
                <span className={s.enterBtnInner}>
                  <span className={s.enterBtnText}>ENTER LIBRARY</span>
                  <ArrowDown className={s.enterBtnArrow} size={20} strokeWidth={2.5} aria-hidden="true" />
                </span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="library"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <Books />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
