import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AVATAR_APP =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC0jY4d8THExYXPvAL-QYtnJqzJBIk7vLslVLwSyPk6YrbZ7022t3wuc9RZLwUur8iaR3wfiFv4ibgHJzXldV9JjrQay2aaPz4nH8cWWtjGq2zw4v6q69w2kABDBjoe_2VucCZAH8dSlYmKTooYQgIz5PvtlS9avuCyl-YPDsEU_xaiP4ular-OfOG94018p1EIuedemhuT2BOX2Wl4BoK3xUnRD6RnAKW83vdnJ2dZXzlIfTqGyKcSmZyOSTvJBI6dqTTDcvW67ckK";

const newMatches = [
  {
    name: "Alisher",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLa5BDurvYQAkq7mCnlrSqATLsmZbkKMbWbZmzdO-DuZvBiH7ovq_gShQmAtQsrU8D9f98HU8jLrgSpVsf5dLM0EMRkBpUV3kvHDndJmBXjL6rt27zgcEZFjlVhveF7n8DkgG9lJygqsM3yBWEq9q_NTAKgtC5CiTdVq-Ui1CwkE3RjoiqScQpspQsuGuIqstrWqvmh4gdMLBPSCW8DhDhKTvLRkKGxqHxCI6UwkIBHCy495n0wmtcnGgtJttzkH6yDZMlDVVSwm8_",
    active: true,
  },
  {
    name: "Laylo",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7MmENsJYy-WcXG__UgweyiQexNNn9LlOidjTy9jK8qZfRMuUiGDdX6WQfFPKTBEpRu1SsQlv_jxpIiOadovnqtbpwf3a9w3Uh2YDOTyDYK3_RKjX_-7L7bultsOfpqMqfnhsYje8qvWivnjqrT2hfFIjUhuhEi7xieEMm-VK_jw0Yy79ulCvFNTmpKsB8QdhTwgozKz-RLP1zwVeMXcbHtZu6hmDgEbjIZvcSMaZ1hUTgPo7LBLmv53KUbi2Zki8b0eEJKMbf6uOk",
    active: false,
  },
  {
    name: "Jasur",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHYIHs8C8IlDOysffVhT3dzMf5PguKW9VS9wkNESGgaSy6871GL2hkW5IRmfkJU23n15UgFDFOGnjYP_osGLdLjm6pH6XvvgshxL3A03pO7gJYxGmCGnq-ekqf-AywBGNrG5lY-r3zhcqT3efGHSuR68V8LggPZqhAhPvyGvTkCaKPFwOrzhHo0KhEi0NMZ0LaNXgcDcVBWkh--61-CUmlAC9AD0PUh2uhrjea6m6AuDRFObbegIwE72ZxelEQ9ZUSSrGJ18yUfc6g",
    active: false,
  },
  {
    name: "Nigora",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1x4fI5cWJB_rHQXZQy47xqVJdnSmZHTgUvYHv9CSVcgJSwGOkEkYZLOPgE8XM-fJalDI3QqVwWMdNnZP8VOxpolhLR4lXtSUcxZeX066TT_OTZ7VzzfKHy1qO1vJ8KAxFXd1DlBG6c2Gmoa9Dr4zpMveqAVO2gDlxPAU8eYW5T7V8yjz-pdZiUeTKDirA6lVDQg1lEMxbNmF0SHZWRFdr4UreYmJq2Oabb9la8vSApn79TGXDBw-ZHoDI2D-14X20kWchNGwWzvum",
    active: false,
  },
  {
    name: "Sardor",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlSi1kCRAsifalLIh0tEe9rsDavfiH3UCcNKIC3muBSl3Mxtm6Cde5vI3ch5OsN9fjxLw23mdEoLGxMn6yTJfPLkzXGVrBOOL388dL5RMia2LBHQAGMFpM5ghGIUHGrJMdqD5AtRAyGIbNcIerE7j47R2l9MaNUCN49gAcK7t1mcWKI-Cxa_PEd61txnbIGdGrmVfCVmUqjNgLl5LM-QGbPmvd1MjAp9pDq7lmrkci3soBH1hiMfolu5uOWDr9UI3liZNoP94q6uCy",
    active: false,
  },
];

type Conv = {
  name: string;
  img: string;
  time: string;
  preview: string;
  unread: number;
  unreadDot: boolean;
  readReceipt?: boolean;
};

export function MatchesPage() {
  const { t } = useTranslation();

  const conversations: Conv[] = [
    {
      name: "Kamila",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUcg6J9mn5t5unHRCDXDnuLAOwfNEDDTwdoRPn9vSPp4JGSowv5_SWf69ckw6eC7mwx_m-iNz8WmXvm-XipR7yGgm0-uxtzqDCpnHykqervcrgbLuGugb-iYxdVKrdCS_E-pORzmop5xvB1ShKh_V1ZJjW8SQFbgkvNC_KA6uR3OWlwJkVqAdB2vytEoj7z46L6CIcL2fC_j2XECSzx64Nay0-_SW-k836CvraYNee9Qh8a5hSkUS_uDbGgczlQK0dQCX9l2C1jHgu",
      time: "12:45",
      preview: t("matches.demo.kamilaPreview"),
      unread: 2,
      unreadDot: true,
    },
    {
      name: "Bekzod",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnU5BWbKa_zWZHlAfzpiLyZzFh7yLeQmZ8cSTx-vDuye_C_98IILnnQ1RSMehwGXNbDb8Kgeohr2ay2kT-esjDkrwlPs-HomIYWzuqAxibldAcd-SpP8KU-3adoHW1uQpoADpMWoDqof5xhW81OeTzx2DyXG4uImtYmkHTjrim8wErmZkLl3t83HuK98Qbp9fGMwu_YglwX98lgzoQoDkYfTL5ON5sY3Ifd-k9SZYb9Zh9lb8n1pDNyt3wXsfzKL6PeljCfdksaKP1",
      time: t("matches.demo.yesterday"),
      preview: t("matches.demo.bekzodPreview"),
      unread: 0,
      unreadDot: false,
    },
    {
      name: "Zuhra",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0x5q2DR9DRP_k994e7fGSNCCjMqp8uCtZW3Q0KHH7bLkpikDwOm-Hp5wS537LbJFJzYxvSNqq7rCldxsHvex-LjbmBiVBgoobyHb_43tv9pAT8i9WCoBQWx0UFAbcr2nfsC3s7I89xcV4wUfIlWcNvYOLXbtku9GgqXw_ChHuFm95e-a7-zDSuPmLPrm3AJLuiZgieccGPFBh3ZhPFAqV5ubjf7L8yfSwYiZyILkRkWOjmgjAtxObhmn-NWoIrKBTHAbarOqbDtzO",
      time: t("matches.demo.wed"),
      preview: t("matches.demo.zuhraPreview"),
      unread: 0,
      unreadDot: false,
    },
    {
      name: "Doston",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuKWB2Pg6GlJ6NjskIg6FVaMZFH2PnrgpMA7mU4o2dR3hGKPQkFO9XUw6DbgENCYH09Ra4oZgHjEif3uFvG3oSRRPHw8gV3Tcn9iw2BGWtF2DaRZ0YQUQLZMgSqx0N1XFXr-Yoqf20fRLDHQsftfvh-0rY72kUII8OYO26LoPlObMQec-xEPVZl8CB-_Pe-MX7ZHeT6LbcupQq3xaUqjT3NnOzkCaIvz8UP2ShSk7PWvIAD1I0yxbUoTI4ZGltHoWbgP0RQR8THZL4",
      time: t("matches.demo.mon"),
      preview: t("matches.demo.dostonPreview"),
      unread: 0,
      unreadDot: false,
      readReceipt: true,
    },
  ];

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background font-body text-on-background">
      <header className="fixed top-0 z-50 flex w-full max-w-md items-center justify-between bg-surface/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary-container shadow-sm">
            <img alt="" src={AVATAR_APP} className="h-full w-full object-cover" />
          </div>
          <span className="font-headline text-lg font-bold tracking-tight text-primary">
            {t("matches.title")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container transition-opacity hover:opacity-80 active:scale-95"
            aria-label={t("matches.searchAria")}
          >
            <span className="material-symbols-outlined text-on-surface-variant">search</span>
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container transition-opacity hover:opacity-80 active:scale-95"
            aria-label={t("matches.filterAria")}
          >
            <span className="material-symbols-outlined text-on-surface-variant">tune</span>
          </button>
        </div>
      </header>

      <main className="grow pb-8 pt-24">
        <section className="mb-8">
          <div className="mb-4 flex items-end justify-between px-6">
            <h2 className="font-headline text-2xl font-bold text-on-background">
              {t("matches.newSection")}
            </h2>
            <span className="font-body text-xs font-bold uppercase tracking-widest text-primary">
              {t("matches.newBadge", { count: 12 })}
            </span>
          </div>
          <div className="hide-scrollbar flex gap-5 overflow-x-auto px-6 pb-2">
            {newMatches.map((m) => (
              <div key={m.name} className="group flex shrink-0 flex-col items-center gap-2">
                <div
                  className={`relative rounded-full border-2 p-1 transition-transform active:scale-95 ${
                    m.active ? "border-primary" : "border-primary/30"
                  }`}
                >
                  <div className="h-20 w-20 overflow-hidden rounded-full shadow-md">
                    <img alt="" src={m.img} className="h-full w-full object-cover" />
                  </div>
                  {m.active ? (
                    <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-background bg-primary" />
                  ) : null}
                </div>
                <span className="font-body text-xs font-bold text-on-surface">{m.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="min-h-screen rounded-t-[2.5rem] bg-surface-container-low pt-8">
          <div className="mb-6 px-6">
            <h2 className="font-headline text-2xl font-bold text-on-background">
              {t("matches.conversations")}
            </h2>
          </div>
          <div className="space-y-1">
            {conversations.map((c) => (
              <Link
                key={c.name}
                to={`/chat/${encodeURIComponent(c.name.toLowerCase())}`}
                className={`flex items-center gap-4 px-6 py-4 transition-colors active:scale-[0.98] ${
                  c.unreadDot
                    ? "bg-surface-container-lowest/50 hover:bg-surface-container-highest"
                    : "hover:bg-surface-container-highest"
                }`}
              >
                <div className="relative shrink-0">
                  <div className="h-16 w-16 overflow-hidden rounded-3xl shadow-sm">
                    <img alt="" src={c.img} className="h-full w-full object-cover" />
                  </div>
                  {c.unreadDot ? (
                    <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-surface-container-lowest bg-primary" />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-baseline justify-between">
                    <h3 className="truncate font-headline font-bold text-on-surface">{c.name}</h3>
                    <span
                      className={`font-body text-[10px] font-bold uppercase ${
                        c.unread ? "text-primary" : "font-medium text-on-surface-variant"
                      }`}
                    >
                      {c.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    {c.readReceipt ? (
                      <div className="flex min-w-0 items-center gap-1 text-primary">
                        <span className="material-symbols-outlined text-sm">done_all</span>
                        <p className="truncate font-body text-sm text-on-surface-variant">
                          {c.preview}
                        </p>
                      </div>
                    ) : (
                      <p
                        className={`truncate font-body text-sm ${
                          c.unread ? "font-semibold text-on-surface" : "text-on-surface-variant"
                        }`}
                      >
                        {c.preview}
                      </p>
                    )}
                    {c.unread > 0 ? (
                      <span className="shrink-0 rounded-full bg-primary px-1.5 py-0.5 font-body text-[10px] font-bold text-on-primary">
                        {c.unread}
                      </span>
                    ) : null}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
