"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookReader } from "./book-reader";
import s from "./books.module.css";

const BOOKS = [
  { roman: "I",   label: "PROFILE",      coverImg: "/cover1.png" },
  { roman: "II",  label: "PROJECTS",     coverImg: "/cover2.png", backCoverImg: "/cover2-back.jpeg" },
  { roman: "III", label: "ACHIEVEMENTS", coverImg: "/cover3.png" },
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
            <div
              className={s.coverFace}
              style={{ backgroundImage: `url('${book.coverImg}')` }}
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <BookReader
            key={selected}
            roman={BOOKS[selected].roman}
            label={BOOKS[selected].label}
            coverImg={BOOKS[selected].coverImg}
            backCoverImg={BOOKS[selected].backCoverImg}
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
