"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from "next/dynamic";
import { forwardRef, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Globe,
  Link2,
  Mail,
  X,
  ZoomIn,
} from "lucide-react";
import { profile, workExperience, education, skills, achievements, projects } from "@/data/data";
import s from "./book-reader.module.css";

const HTMLFlipBook = dynamic(() => import("react-pageflip"), {
  ssr: false,
}) as any;

const PAGE_SIZES = {
  sm: { w: 300, h: 428, portrait: true  }, // ≤480px  — single page, portrait
  md: { w: 360, h: 514, portrait: true  }, // ≤700px  — single page, portrait
  lg: { w: 420, h: 600, portrait: false }, // >700px  — double spread
} as const;

function usePageSize() {
  const [size, setSize] = useState<{ w: number; h: number; portrait: boolean } | null>(null);
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      if (vw <= 480)      setSize(PAGE_SIZES.sm);
      else if (vw <= 700) setSize(PAGE_SIZES.md);
      else                setSize(PAGE_SIZES.lg);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

/* cover · photo · all-cv · back-cover */
const PROFILE_TOTAL_PAGES = 4;
/* cover · ach1 · ach2 · ach3 · back-cover */
const ACHIEVEMENTS_TOTAL_PAGES = 5;
/* cover · (content+album)×4 · back-cover */
const PROJECTS_TOTAL_PAGES = 10;

/* Detect vertical orientation from filename: -v1., _v1., etc. */
const isVerticalPhoto = (src: string) => /[-_]v\d*\./i.test(src);

/* ── Achievement image config ────────────────────────────── */
const ACHIEVEMENT_IMAGES = [
  {
    header: "/achievements/achievement1/TrickorAdmit_main_h.png",
    /* game jam victory · emerald green */
    color: "#1a7a50",
    gallery: [
      "/achievements/achievement1/globalgamejam_h1.png",
      "/achievements/achievement1/globalgamejam_h2.png",
      "/achievements/achievement1/globalgamejam_v1.jpeg",
    ],
  },
  {
    header: "/achievements/achievement2/Tutsak_main_h.jpeg",
    /* indie competition · deep ruby */
    color: "#a83232",
    gallery: [
      "/achievements/achievement2/ayazjam_h1.JPG",
      "/achievements/achievement2/ayazjam_h2.JPG",
      "/achievements/achievement2/ayazjam_v1.jpeg",
    ],
  },
  {
    header: "/achievements/achievement3/loreal_main_h.png",
    /* beauty & innovation · rose */
    color: "#a0306a",
    gallery: [
      "/achievements/achievement3/loreal1_h1.jpg",
      "/achievements/achievement3/loreal2_h2.jpg",
      "/achievements/achievement3/loreal3_h3.jpg",
    ],
  },
];

const PROJECT_IMAGES = [
  {
    header: "/projects/game1/Tutsak_main_h.jpeg",
    /* courtroom · cold · slate grey */
    color: "#6b7280",
    gallery: [
      "/projects/game1/tutsak-h1.jpg",
      "/projects/game1/tutsak-h2.jpg",
      "/projects/game1/tutsak-h3.jpg",
      "/projects/game1/tutsak-h4.jpg",
      "/projects/game1/tutsak-h5.jpg",
    ],
  },
  {
    header: "/projects/game2/TrickorAdmit_main_h.png",
    /* Halloween · carved pumpkin · burnt orange */
    color: "#c45010",
    gallery: [
      "/projects/game2/trickoradmit-h1.jpg",
      "/projects/game2/trickoradmit-h2.jpg",
      "/projects/game2/trickoradmit-h3.jpg",
      "/projects/game2/trickoradmit-h4.jpg",
      "/projects/game2/trickoradmit-h5.jpg",
      "/projects/game2/trickoradmit-h6.png",
    ],
  },
  {
    header: "/projects/game3/magtwin_main_h.png",
    /* magnetic · electric charge · steel blue */
    color: "#1e7eb8",
    gallery: [
      "/projects/game3/magtwin-h1.png",
      "/projects/game3/magtwin-h2.png",
      "/projects/game3/magtwin-h3.png",
      "/projects/game3/magtwin-h4.png",
      "/projects/game3/magtwin-h5.jpeg",
    ],
  },
  {
    header: "/projects/game4/Ilunia_main_h.png",
    /* psychological · nature · forest green */
    color: "#16a34a",
    gallery: [
      "/projects/game4/ilunia-h1.jpeg",
      "/projects/game4/ilunia-h2.jpeg",
      "/projects/game4/ilunia-v1.jpeg",
      "/projects/game4/ilunia-v2.jpeg",
      "/projects/game4/ilunia-v3.jpeg",
      "/projects/game4/ilunia-v4.jpeg",
      "/projects/game4/ilunia-v5.jpeg",
      "/projects/game4/ilunia-v6.jpeg",
      "/projects/game4/ilunia-v7.jpeg",
      "/projects/game4/ilunia-v8.jpeg",
      "/projects/game4/ilunia-v9.jpeg",
    ],
  },
];

/* ── Cover ──────────────────────────────────────────────────── */
const CoverPage = forwardRef<HTMLDivElement, { roman: string; label: string; coverImg?: string; onClose?: () => void }>(
  ({ roman, label, coverImg, onClose }, ref) => (
    /* outer: library sets display:block + height inline on the ref div */
    <div ref={ref}>
      <div
        className={s.cover}
        style={coverImg ? { backgroundImage: `url('${coverImg}')` } : undefined}
      >
        {!coverImg && !onClose && (
          <div className={s.coverFrame}>
            <span className={s.coverRoman}>{roman}</span>
            <span className={s.coverLabel}>{label}</span>
          </div>
        )}
        {onClose && (
          <button className={s.returnBtn} onClick={(e) => { e.stopPropagation(); onClose(); }}>
            <span className={s.returnBtnArrow}><ArrowLeft size={18} strokeWidth={2.5} /></span>
            <span className={s.returnBtnText}>RETURN TO LIBRARY</span>
          </button>
        )}
      </div>
    </div>
  )
);
CoverPage.displayName = "CoverPage";

/* ── Photo page ─────────────────────────────────────────────── */
const ProfilePhotoPage = forwardRef<HTMLDivElement, Record<string, never>>(
  (_, ref) => {
    const parts = profile.name.split(' ');
    const firstName = parts.slice(0, -1).join(' ');
    const lastName = parts[parts.length - 1];
    return (
      <div ref={ref}>
        <div className={s.photoPage}>
          <div className={s.photoImgWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile/profile_v.png"
              alt={profile.name}
              className={s.photoImg}
            />
          </div>
          <div className={s.photoCaption}>
            <span className={s.photoFirstName}>{firstName}</span>
            <span className={s.photoLastName}>{lastName}</span>
            <span className={s.photoTitle}>GAME DESIGNER</span>
          </div>
        </div>
      </div>
    );
  }
);
ProfilePhotoPage.displayName = "ProfilePhotoPage";

/* ── CV page 1: Education (full page) ───────────────────────── */
const CVPageEducation = forwardRef<HTMLDivElement, Record<string, never>>(
  (_, ref) => (
    <div ref={ref}>
    <div className={s.cvPage}>

      <section className={`${s.cvSec} ${s.cvSecGrow}`}>
        <div className={`${s.cvHdr} ${s.cvHdrR}`}>
          <span className={s.cvHdrTick}>◆</span>
          <span className={s.cvHdrTxt}>EDUCATION</span>
          <span className={s.cvHdrHatch} aria-hidden="true" />
        </div>
        <div className={s.cvBody}>
          {education.map((e, i) => (
            <div key={i} className={s.cvEduBlock}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/profile/metu_logo_h.png" alt="METU" className={s.cvEduLogo} />
              <div className={s.cvEduMeta}>
                <div className={s.cvEduInstitution}>{e.institution}</div>
                <div className={s.cvEduDegree}>{e.degree}</div>
                <div className={s.cvEduPeriod}>{e.location} · {e.period}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
    </div>
  )
);
CVPageEducation.displayName = "CVPageEducation";

/* ── CV page 2: Work Experience (full page) ─────────────────── */
const CVPageWork = forwardRef<HTMLDivElement, Record<string, never>>(
  (_, ref) => (
    <div ref={ref}>
    <div className={s.cvPage}>

      <section className={`${s.cvSec} ${s.cvSecWork}`}>
        <div className={`${s.cvHdr} ${s.cvHdrY}`}>
          <span className={s.cvHdrTick}>◆</span>
          <span className={s.cvHdrTxt}>WORK EXPERIENCE</span>
          <span className={s.cvHdrHatch} aria-hidden="true" />
        </div>
        <div className={s.cvBody}>
          {workExperience.map((w, i) => (
            <div key={i} className={s.cvWorkBlock}>
              <div className={s.cvLogoRow}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/profile/T1_logo_h.png" alt="TigerOne Studios" className={s.cvLogo} />
                <div className={s.cvLogoMeta}>
                  <div className={s.cvBold}>{w.company} · {w.role}</div>
                  <div className={s.cvMuted}>{w.location} · {w.period}</div>
                </div>
              </div>
              <ul className={s.cvBullets}>
                {w.bullets.map((b, j) => (
                  <li key={j} className={s.cvBullet}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

    </div>
    </div>
  )
);
CVPageWork.displayName = "CVPageWork";

/* ── CV page 2: Skills + Interests + Languages + Contact ────── */
const CVPage2 = forwardRef<HTMLDivElement, Record<string, never>>(
  (_, ref) => (
    <div ref={ref}>
    <div className={s.cvPage}>

      <section className={s.cvSec}>
        <div className={`${s.cvHdr} ${s.cvHdrR}`}>
          <span className={s.cvHdrTick}>◆</span>
          <span className={s.cvHdrTxt}>SKILLS</span>
          <span className={s.cvHdrHatch} aria-hidden="true" />
        </div>
        <div className={s.cvBody}>
          <div className={s.cvSkillGrid}>
            {skills.professional.map((sk, i) => (
              <span key={i} className={s.cvSkillTag}>{sk}</span>
            ))}
          </div>
        </div>
      </section>

      <section className={`${s.cvSec} ${s.cvSecGrow}`}>
        <div className={`${s.cvHdr} ${s.cvHdrY}`}>
          <span className={s.cvHdrTick}>◆</span>
          <span className={s.cvHdrTxt}>INTERESTS</span>
          <span className={s.cvHdrHatch} aria-hidden="true" />
        </div>
        <div className={s.cvBody}>
          <div className={s.cvInterestTags}>
            {skills.interests.map((interest, i) => (
              <span
                key={i}
                className={`${s.cvInterestTag} ${
                  i % 3 === 0 ? s.cvInterestTagY :
                  i % 3 === 1 ? s.cvInterestTagR :
                  s.cvInterestTagK
                }`}
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className={s.cvSec}>
        <div className={`${s.cvHdr} ${s.cvHdrR}`}>
          <span className={s.cvHdrTick}>◆</span>
          <span className={s.cvHdrTxt}>LANGUAGES</span>
          <span className={s.cvHdrHatch} aria-hidden="true" />
        </div>
        <div className={s.cvBody}>
          <div className={s.cvLangRow}>
            {skills.languages.map((l, i) => (
              <div key={i} className={s.cvLangCard}>
                <span className={s.cvLangName}>{l.name}</span>
                <span className={s.cvLangBadge}>{l.level}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={s.cvSec}>
        <div className={`${s.cvHdr} ${s.cvHdrY}`}>
          <span className={s.cvHdrTick}>◆</span>
          <span className={s.cvHdrTxt}>CONTACT</span>
          <span className={s.cvHdrHatch} aria-hidden="true" />
        </div>
        <div className={s.cvContactGrid}>
          <div className={s.cvContactItem}>
            <span className={s.cvContactIcon}><Mail size={13} strokeWidth={2.5} /></span>
            <span className={s.cvContactText}>{profile.email}</span>
          </div>
          <div className={s.cvContactItem}>
            <span className={s.cvContactIcon}><Link2 size={13} strokeWidth={2.5} /></span>
            <span className={s.cvContactText}>{profile.linkedin}</span>
          </div>
          <div className={s.cvContactItem}>
            <span className={s.cvContactIcon}><Globe size={13} strokeWidth={2.5} /></span>
            <span className={s.cvContactText}>{profile.website}</span>
          </div>
        </div>
      </section>

    </div>
    </div>
  )
);
CVPage2.displayName = "CVPage2";

/* ── CV page ALL: contact · work · education · skills ─────── */
const CVPageAll = forwardRef<HTMLDivElement, Record<string, never>>(
  (_, ref) => (
    <div ref={ref}>
    <div className={`${s.cvPage} ${s.cvPageAll}`}>

      {/* EDUCATION */}
      <section className={s.cvSec}>
        <div className={`${s.cvHdr} ${s.cvHdrY}`}>
          <span className={s.cvHdrTick}>◆</span>
          <span className={s.cvHdrTxt}>EDUCATION</span>
          <span className={s.cvHdrHatch} aria-hidden="true" />
        </div>
        <div className={s.cvBody}>
          {education.map((e, i) => (
            <div key={i} className={s.cvLogoRow}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/profile/metu_logo_h.png" alt="METU" className={s.cvLogo} />
              <div className={s.cvLogoMeta}>
                <div className={s.cvBold}>{e.institution}</div>
                <div className={s.cvMuted}>{e.degree}</div>
                <div className={s.cvMuted}>{e.location} · {e.period}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WORK EXPERIENCE */}
      <section className={s.cvSec}>
        <div className={`${s.cvHdr} ${s.cvHdrR}`}>
          <span className={s.cvHdrTick}>◆</span>
          <span className={s.cvHdrTxt}>WORK EXPERIENCE</span>
          <span className={s.cvHdrHatch} aria-hidden="true" />
        </div>
        <div className={s.cvBody}>
          {workExperience.map((w, i) => (
            <div key={i} className={s.cvWorkBlock}>
              <div className={s.cvLogoRow}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/profile/T1_logo_h.png" alt="TigerOne Studios" className={s.cvLogo} />
                <div className={s.cvLogoMeta}>
                  <div className={s.cvBold}>{w.company} · {w.role}</div>
                  <div className={s.cvMuted}>{w.location} · {w.period}</div>
                </div>
              </div>
              <ul className={s.cvBullets}>
                {w.bullets.map((b, j) => (
                  <li key={j} className={s.cvBullet}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className={s.cvSec}>
        <div className={`${s.cvHdr} ${s.cvHdrR}`}>
          <span className={s.cvHdrTick}>◆</span>
          <span className={s.cvHdrTxt}>SKILLS</span>
          <span className={s.cvHdrHatch} aria-hidden="true" />
        </div>
        <div className={s.cvBody}>
          <div className={s.cvSkillGrid}>
            {skills.professional.map((sk, i) => (
              <span key={i} className={s.cvSkillTag}>{sk}</span>
            ))}
          </div>
        </div>
      </section>

      {/* LANGUAGES */}
      <section className={s.cvSec}>
        <div className={`${s.cvHdr} ${s.cvHdrY}`}>
          <span className={s.cvHdrTick}>◆</span>
          <span className={s.cvHdrTxt}>LANGUAGES</span>
          <span className={s.cvHdrHatch} aria-hidden="true" />
        </div>
        <div className={s.cvBody}>
          <div className={s.cvLangRow}>
            {skills.languages.map((l, i) => (
              <div key={i} className={s.cvLangCard}>
                <span className={s.cvLangName}>{l.name}</span>
                <span className={s.cvLangBadge}>{l.level}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERESTS */}
      <section className={s.cvSec}>
        <div className={`${s.cvHdr} ${s.cvHdrR}`}>
          <span className={s.cvHdrTick}>◆</span>
          <span className={s.cvHdrTxt}>INTERESTS</span>
          <span className={s.cvHdrHatch} aria-hidden="true" />
        </div>
        <div className={s.cvBody}>
          <div className={s.cvInterestTags}>
            {skills.interests.map((interest, i) => (
              <span key={i} className={`${s.cvInterestTag} ${
                i % 3 === 0 ? s.cvInterestTagY :
                i % 3 === 1 ? s.cvInterestTagR :
                s.cvInterestTagK
              }`}>{interest}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className={s.cvSec}>
        <div className={`${s.cvHdr} ${s.cvHdrY}`}>
          <span className={s.cvHdrTick}>◆</span>
          <span className={s.cvHdrTxt}>CONTACT</span>
          <span className={s.cvHdrHatch} aria-hidden="true" />
        </div>
        <div className={s.cvContactGrid}>
          <div className={s.cvContactItem}>
            <span className={s.cvContactIcon}><Mail size={10} strokeWidth={2.5} /></span>
            <span className={s.cvContactText}>{profile.email}</span>
          </div>
          <div className={s.cvContactItem}>
            <span className={s.cvContactIcon}><Globe size={10} strokeWidth={2.5} /></span>
            <span className={s.cvContactText}>{profile.website}</span>
          </div>
          <div className={s.cvContactItem}>
            <span className={s.cvContactIcon}><Link2 size={10} strokeWidth={2.5} /></span>
            <span className={s.cvContactText}>{profile.linkedin}</span>
          </div>
        </div>
      </section>

    </div>
    </div>
  )
);
CVPageAll.displayName = "CVPageAll";

/* ── Achievement page ───────────────────────────────────────── */
interface AchievementPageProps {
  achievement: {
    title: string;
    rank: string;
    period: string;
    bullets: string[];
    links: { label: string; href: string }[];
    centeredBullets?: boolean;
  };
  images: { header: string; gallery: string[]; color: string };
  onPhotoClick: (photoIdx: number) => void;
}

const AchievementPage = forwardRef<HTMLDivElement, AchievementPageProps>(
  ({ achievement, images, onPhotoClick }, ref) => (
    <div ref={ref}>
    <div className={s.achPage} style={{ "--ach-accent": images.color } as React.CSSProperties}>

      {/* Header image with rank badge */}
      <div className={s.achHeaderWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images.header} alt={achievement.title} className={s.achHeaderImg} />
        <div className={s.achRankBadge} aria-hidden="true">
          <span className={s.achRankNum}>{achievement.rank}</span>
          <span className={s.achRankLabel}>PLACE</span>
        </div>
      </div>

      {/* Title + content */}
      <div className={s.achContent}>
        <div className={s.achTitleWrap}>
          <span className={s.achTitleText}>{achievement.title}</span>
        </div>
        <div className={s.achBody}>
          <div className={s.achPeriod}>{achievement.period}</div>
          <ul className={`${s.achBullets} ${achievement.centeredBullets ? s.achBulletsVCenter : ""}`}>
            {achievement.bullets.map((b, i) => (
              <li key={i} className={s.achBullet}>{b}</li>
            ))}
          </ul>
          {achievement.links.length > 0 && (
            <div className={s.achLinks}>
              {achievement.links.map((lnk, i) => (
                <a
                  key={i}
                  href={lnk.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.achLinkBtn}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className={s.achLinkBtnInner}>{lnk.label}<ExternalLink size={10} strokeWidth={2.5} /></span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Photos section header */}
      <div className={s.achGalleryHeader}>
        <span className={s.achGalleryDividerLine} />
        <span className={s.achGalleryLabel}>PHOTOS</span>
        <span className={s.achGalleryDividerLine} />
      </div>

      {/* Photo gallery row */}
      <div className={s.achGallery}>
        {images.gallery.map((src, i) => (
          <button
            key={i}
            className={s.achThumb}
            onClick={(e) => { e.stopPropagation(); onPhotoClick(i); }}
            aria-label={`View photo ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className={s.achThumbImg} />
            <div className={s.achThumbOverlay} aria-hidden="true">
              <ZoomIn className={s.achThumbIcon} size={22} strokeWidth={2} />
            </div>
          </button>
        ))}
      </div>
    </div>
    </div>
  )
);
AchievementPage.displayName = "AchievementPage";

/* ── Project Content Page (left) ────────────────────────────── */
interface ProjectContentPageProps {
  project: typeof projects[number];
  images: typeof PROJECT_IMAGES[number];
  color: string;
}

const ProjectContentPage = forwardRef<HTMLDivElement, ProjectContentPageProps>(
  ({ project, images, color }, ref) => (
    <div ref={ref}>
      <div className={s.projPage} style={{ "--proj-accent": color } as React.CSSProperties}>

        {/* Header image */}
        <div className={s.projHeaderWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images.header} alt={project.title} className={s.projHeaderImg} />
          {/* Jam badge overlaid on photo */}
          {project.jamInfo && (
            <div className={s.projJamOverlay}>
              <span className={s.projJamOverlayRank}>{project.jamInfo.rank}</span>
              <span className={s.projJamOverlayName}>{project.jamInfo.name}</span>
              <span className={s.projJamOverlayPeriod}>{project.jamInfo.period}</span>
            </div>
          )}
        </div>

        {/* Big title */}
        <div className={s.projTitleWrap}>
          <span className={s.projTitleText}>{project.title}</span>
        </div>

        {/* Content: subtitle → badges → bullets → links (CTA) */}
        <div className={s.projContent}>
          <div className={s.projBody}>
            <div className={s.projSubtitle}>{project.subtitle}</div>

            {/* Badge row */}
            {"badges" in project && (project as { badges: string[] }).badges.length > 0 && (
              <div className={s.projBadgeRow}>
                {(project as { badges: string[] }).badges.map((badge, i) => (
                  <span key={i} className={s.projBadge}>{badge}</span>
                ))}
              </div>
            )}

            {/* Short description */}
            {"description" in project && project.description && (
              <p className={s.projDescription}>{(project as { description: string }).description}</p>
            )}

            {/* Bullets */}
            <ul className={s.projBullets}>
              {project.bullets.map((b, i) => (
                <li key={i} className={s.projBullet}>{b}</li>
              ))}
            </ul>

            {/* CTA links */}
            {project.links.length > 0 && (
              <div className={s.projLinks}>
                {project.links.map((lnk, i) => (
                  <a
                    key={i}
                    href={lnk.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={s.projLinkBtn}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className={s.projLinkBtnInner}>{lnk.label}<ExternalLink size={10} strokeWidth={2.5} /></span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
);
ProjectContentPage.displayName = "ProjectContentPage";

/* ── Project Album Page (right) ─────────────────────────────── */
interface ProjectAlbumPageProps {
  images: typeof PROJECT_IMAGES[number];
  onPhotoClick: (idx: number) => void;
  color: string;
}

const ProjectAlbumPage = forwardRef<HTMLDivElement, ProjectAlbumPageProps>(
  ({ images, onPhotoClick, color }, ref) => (
    <div ref={ref}>
      <div className={s.projAlbumPage} style={{ "--proj-accent": color } as React.CSSProperties}>
        {/* Full-page mosaic: h-images span 2 cols, v-images span 1 col */}
        <div className={s.projAlbumGrid}>
          {images.gallery.map((src, i) => {
            const isV = isVerticalPhoto(src);
            return (
              <button
                key={i}
                className={`${s.projThumb} ${isV ? s.projThumbV : s.projThumbH}`}
                onClick={(e) => { e.stopPropagation(); onPhotoClick(i); }}
                aria-label={`View photo ${i + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className={s.projThumbImg} />
                <div className={s.projThumbOverlay} aria-hidden="true">
                  <ZoomIn className={s.projThumbIcon} size={26} strokeWidth={2} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  )
);
ProjectAlbumPage.displayName = "ProjectAlbumPage";

/* ── Photo modal (lightbox) ─────────────────────────────────── */
interface PhotoModalProps {
  images: string[];
  currentIdx: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
}

function PhotoModal({ images, currentIdx, onNext, onPrev, onClose }: PhotoModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onNext();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNext, onPrev, onClose]);

  return (
    <motion.div
      className={s.photoModal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <button className={s.photoModalClose} onClick={onClose} aria-label="Close">
        <X size={14} strokeWidth={2.5} />
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          className={s.photoModalImgWrap}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[currentIdx]} alt="" className={s.photoModalImg} />
        </motion.div>
      </AnimatePresence>

      <button
        className={`${s.photoModalNav} ${s.photoModalNavPrev}`}
        onClick={onPrev}
        aria-label="Previous photo"
      >
        <ChevronLeft size={22} strokeWidth={3} />
      </button>
      <button
        className={`${s.photoModalNav} ${s.photoModalNavNext}`}
        onClick={onNext}
        aria-label="Next photo"
      >
        <ChevronRight size={22} strokeWidth={3} />
      </button>

      <div className={s.photoModalDots}>
        {images.map((_, i) => (
          <span
            key={i}
            className={`${s.photoModalDot} ${i === currentIdx ? s.photoModalDotActive : ""}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── BookReader ─────────────────────────────────────────────── */
interface Props {
  roman: string;
  label: string;
  coverImg?: string;
  backCoverImg?: string;
  isProfile?: boolean;
  isAchievements?: boolean;
  isProjects?: boolean;
  onClose: () => void;
}

export function BookReader({ roman, label, coverImg, backCoverImg, isProfile, isAchievements, isProjects, onClose }: Props) {
  const bookRef = useRef<any>(null);
  const returnBtnRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = usePageSize();
  const [bookReady, setBookReady] = useState(false);
  const [photoModal, setPhotoModal] = useState<{ images: string[]; currentIdx: number } | null>(null);
  /* ref mirror of photoModal so keyboard handler doesn't need re-registration */
  const photoModalRef = useRef(photoModal);

  useEffect(() => { setBookReady(false); }, [pageSize]);

  /* Save focus before opening; restore on unmount */
  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    returnBtnRef.current?.focus();
    return () => { previousFocusRef.current?.focus(); };
  }, []);

  /* Keep photoModalRef in sync */
  useEffect(() => { photoModalRef.current = photoModal; }, [photoModal]);

  /* Arrow key navigation — defers to photo modal when it is open */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (photoModalRef.current !== null) return;
      if (e.key === "ArrowRight") bookRef.current?.pageFlip().flipNext();
      else if (e.key === "ArrowLeft") bookRef.current?.pageFlip().flipPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!pageSize) return null;
  const { w: PAGE_W, h: PAGE_H, portrait } = pageSize;

  const totalPages = isAchievements
    ? ACHIEVEMENTS_TOTAL_PAGES
    : isProjects
    ? PROJECTS_TOTAL_PAGES
    : PROFILE_TOTAL_PAGES;

  const flipNext = () => bookRef.current?.pageFlip().flipNext();
  const flipPrev = () => bookRef.current?.pageFlip().flipPrev();

  // Build inner pages — react-pageflip rejects null children
  const innerPages = isProfile
    ? [<ProfilePhotoPage />, <CVPageAll />]
    : isAchievements
    ? achievements.map((ach, i) => (
        <AchievementPage
          key={i}
          achievement={ach}
          images={ACHIEVEMENT_IMAGES[i]}
          onPhotoClick={(photoIdx) =>
            setPhotoModal({ images: ACHIEVEMENT_IMAGES[i].gallery, currentIdx: photoIdx })
          }
        />
      ))
    : isProjects
    ? projects.flatMap((proj, i) => [
        <ProjectContentPage
          key={`pc-${i}`}
          project={proj}
          images={PROJECT_IMAGES[i]}
          color={PROJECT_IMAGES[i].color}
        />,
        <ProjectAlbumPage
          key={`pa-${i}`}
          images={PROJECT_IMAGES[i]}
          color={PROJECT_IMAGES[i].color}
          onPhotoClick={(photoIdx) =>
            setPhotoModal({ images: PROJECT_IMAGES[i].gallery, currentIdx: photoIdx })
          }
        />,
      ])
    : [];

  const closePhoto = () => setPhotoModal(null);

  const nextPhoto = () =>
    setPhotoModal((prev) =>
      prev ? { ...prev, currentIdx: (prev.currentIdx + 1) % prev.images.length } : null
    );

  const prevPhoto = () =>
    setPhotoModal((prev) =>
      prev
        ? { ...prev, currentIdx: (prev.currentIdx + prev.images.length - 1) % prev.images.length }
        : null
    );

  return (
    <motion.div
      className={s.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button ref={returnBtnRef} className={s.returnToLib} onClick={onClose}>
        <ArrowLeft className={s.returnToLibArrow} size={18} strokeWidth={2.5} />
        <span className={s.returnToLibText}>RETURN TO LIBRARY</span>
      </button>

      <motion.div
        className={s.container}
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 24 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      >
        <div className={s.bookRow}>
          <button className={`${s.sideBtn} ${s.sideBtnPrev}`} onClick={flipPrev} aria-label="Previous page">
            <ChevronLeft size={28} strokeWidth={3} />
          </button>

          <div
            className={s.bookWrap}
            style={{
              width: portrait ? PAGE_W : PAGE_W * 2,
              height: PAGE_H,
              opacity: bookReady ? 1 : 0,
              transition: "opacity 0.18s ease",
            }}
          >
            <HTMLFlipBook
              key={`${PAGE_W}x${PAGE_H}`}
              ref={bookRef}
              width={PAGE_W}
              height={PAGE_H}
              size="fixed"
              minWidth={PAGE_W}
              maxWidth={PAGE_W}
              minHeight={PAGE_H}
              maxHeight={PAGE_H}
              showCover={true}
              usePortrait={portrait}
              drawShadow={true}
              flippingTime={700}
              maxShadowOpacity={0.5}
              mobileScrollSupport={false}
              clickEventForward={false}
              useMouseEvents={false}
              swipeDistance={99999}
              showPageCorners={false}
              disableFlipByClick={true}
              autoSize={false}
              startZIndex={0}
              startPage={0}
              renderOnlyPageLengthChange={false}
              onFlip={(e: any) => setCurrentPage(e.data)}
              onInit={() => setBookReady(true)}
              className=""
              style={{}}
            >
              <CoverPage roman={roman} label={label} coverImg={coverImg} />
              {...innerPages}
              <CoverPage roman={roman} label={label} coverImg={backCoverImg ?? coverImg} onClose={onClose} />
            </HTMLFlipBook>
          </div>

          <button className={`${s.sideBtn} ${s.sideBtnNext}`} onClick={flipNext} aria-label="Next page">
            <ChevronRight size={28} strokeWidth={3} />
          </button>
        </div>

        <span
          className={s.pageIndicator}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          aria-label={`Page ${currentPage + 1} of ${totalPages}`}
        >
          ◆ {currentPage + 1} / {totalPages} ◆
        </span>
      </motion.div>

      {/* Photo lightbox — rendered inside the overlay, above the book */}
      <AnimatePresence>
        {photoModal !== null && (
          <PhotoModal
            key="photo-modal"
            images={photoModal.images}
            currentIdx={photoModal.currentIdx}
            onNext={nextPhoto}
            onPrev={prevPhoto}
            onClose={closePhoto}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
