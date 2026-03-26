"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookReader } from "./book-reader";
import s from "./books.module.css";

const BOOKS = [
  { roman: "I",   label: "PROFILE"      },
  { roman: "II",  label: "PROJECTS"     },
  { roman: "III", label: "ACHIEVEMENTS" },
];

export function Books() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <div className={s.row}>
        {BOOKS.map((book, idx) => (
          <motion.button
            key={idx}
            className={s.bookBtn}
            onClick={() => setSelected(idx)}
            aria-label={`Open ${book.label} book`}
            initial={{
              opacity: 0,
              x: -80,
              y: 40,
              rotate: -8,
              scale: 0.82,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 16,
              mass: 1.6,
              delay: idx * 0.32,
            }}
            whileTap={{ scale: 0.94 }}
          >
            <div className={s.coverFace}>
              <div className={s.coverInner}>
                <span className={s.coverRoman}>{book.roman}</span>
                <span className={s.coverLabel}>{book.label}</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <BookReader
            key={selected}
            roman={BOOKS[selected].roman}
            label={BOOKS[selected].label}
            isProfile={selected === 0}
            isProjects={selected === 1}
            isAchievements={selected === 2}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
