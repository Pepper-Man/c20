import Metabox, {MetaboxProps} from "../Metabox/Metabox";
import Stub from "../Article/Stub";
import Breadcrumbs from "./Breadcrumbs";
import {useCtx} from "../Ctx/Ctx";
import {REPO_URL} from "../../utils/external-urls";
import {Lang} from "../../utils/localization";
import {ComponentChildren} from "preact";
import {type PageLink} from "../../content";
import {useLocalize} from "../Locale/Locale";

// keep this sorted with longer root/prefixes listed first as the code looks for the first match.
const spaces = [
  {root: "/hr", img: "/hr/Halo_reach_final_boxshot.jpg"},
  {root: "/h3odst", img: "/h3odst/Halo_3_odst_final_boxshot.jpg"},
  {root: "/h3", img: "/h3/Halo_3_final_boxshot.jpg"},
  {root: "/h2", img: "/h2/h2cover.jpg"},
  {root: "/h1", img: "/h1/box-art.jpg"},
];

export type ArticleProps = {
  stub?: boolean;
  title?: string;
  navParents?: PageLink[];
  metabox?: MetaboxProps;
  otherLangs: Record<Lang, PageLink>;
  children?: ComponentChildren;
};

const langNames = {
  en: "English",
  es: "Español"
};

const localizations = {
  edit: {
    en: "Edit",
    es: "Editar"
  },
};

export default function Article(props: ArticleProps) {
  const ctx = useCtx();
  const {localize} = useLocalize(localizations);
  const editPageUrl = ctx ? `${REPO_URL}/edit/master/src/content${ctx.pageId}/readme${ctx.lang == "en" ? "" : "_" + ctx.lang}.md` : undefined;
  const space = ctx ? spaces.find(s => ctx.pageId.startsWith(s.root)) : undefined;

  return (
    <article className="content-article">
      <div className="page-title">
        {props.navParents &&
          <nav className="breadcrumbs">
            <Breadcrumbs parents={props.navParents}/>
          </nav>
        }
        <div className="title-line">
          <h1 className="page-title">{props.title}</h1>
          <div className="title-extra">
            {props.otherLangs && Object.entries(props.otherLangs).length > 0 && Object.entries(props.otherLangs).map(([otherLang, otherLink]) =>
              <a href={otherLink.url} title={otherLink.title}>{langNames[otherLang] ?? otherLang} /</a>
            )}
            {editPageUrl &&
              <a href={editPageUrl}>{localize("edit")}</a>
            }
            {space && ctx &&
              <a href={ctx.resolvePage(space.root).url}>
                <img className="space-image" src={space.img} alt={ctx.resolvePage(space.root).title}/>
              </a>
            }
          </div>
        </div>
      </div>
      {props.metabox &&
        <Metabox title={props.title} {...props.metabox}/>
      }
      {props.stub &&
        <Stub/>
      }
      {props.children}
    </article>
  );
};