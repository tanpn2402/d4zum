--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3 (Debian 14.3-1.pgdg110+1)
-- Dumped by pg_dump version 14.3 (Debian 14.3-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin_permissions; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.admin_permissions (
    id integer NOT NULL,
    action character varying(255),
    subject character varying(255),
    properties jsonb,
    conditions jsonb,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);


ALTER TABLE public.admin_permissions OWNER TO f4admin;

--
-- Name: admin_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: f4admin
--

CREATE SEQUENCE public.admin_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admin_permissions_id_seq OWNER TO f4admin;

--
-- Name: admin_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: f4admin
--

ALTER SEQUENCE public.admin_permissions_id_seq OWNED BY public.admin_permissions.id;


--
-- Name: admin_permissions_role_links; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.admin_permissions_role_links (
    permission_id integer,
    role_id integer
);


ALTER TABLE public.admin_permissions_role_links OWNER TO f4admin;

--
-- Name: admin_roles; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.admin_roles (
    id integer NOT NULL,
    name character varying(255),
    code character varying(255),
    description character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);


ALTER TABLE public.admin_roles OWNER TO f4admin;

--
-- Name: admin_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: f4admin
--

CREATE SEQUENCE public.admin_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admin_roles_id_seq OWNER TO f4admin;

--
-- Name: admin_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: f4admin
--

ALTER SEQUENCE public.admin_roles_id_seq OWNED BY public.admin_roles.id;


--
-- Name: admin_users; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.admin_users (
    id integer NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    username character varying(255),
    email character varying(255),
    password character varying(255),
    reset_password_token character varying(255),
    registration_token character varying(255),
    is_active boolean,
    blocked boolean,
    prefered_language character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);


ALTER TABLE public.admin_users OWNER TO f4admin;

--
-- Name: admin_users_id_seq; Type: SEQUENCE; Schema: public; Owner: f4admin
--

CREATE SEQUENCE public.admin_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admin_users_id_seq OWNER TO f4admin;

--
-- Name: admin_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: f4admin
--

ALTER SEQUENCE public.admin_users_id_seq OWNED BY public.admin_users.id;


--
-- Name: admin_users_roles_links; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.admin_users_roles_links (
    user_id integer,
    role_id integer
);


ALTER TABLE public.admin_users_roles_links OWNER TO f4admin;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    slug character varying(255),
    name character varying(255),
    description text,
    color character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);


ALTER TABLE public.categories OWNER TO f4admin;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: f4admin
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO f4admin;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: f4admin
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    content text,
    is_blocked boolean,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);


ALTER TABLE public.comments OWNER TO f4admin;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: f4admin
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO f4admin;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: f4admin
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: comments_post_links; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.comments_post_links (
    comment_id integer,
    post_id integer
);


ALTER TABLE public.comments_post_links OWNER TO f4admin;

--
-- Name: comments_user_links; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.comments_user_links (
    comment_id integer,
    user_id integer
);


ALTER TABLE public.comments_user_links OWNER TO f4admin;

--
-- Name: files; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.files (
    id integer NOT NULL,
    name character varying(255),
    alternative_text character varying(255),
    caption character varying(255),
    width integer,
    height integer,
    formats jsonb,
    hash character varying(255),
    ext character varying(255),
    mime character varying(255),
    size numeric(10,2),
    url character varying(255),
    preview_url character varying(255),
    provider character varying(255),
    provider_metadata jsonb,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);


ALTER TABLE public.files OWNER TO f4admin;

--
-- Name: files_id_seq; Type: SEQUENCE; Schema: public; Owner: f4admin
--

CREATE SEQUENCE public.files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.files_id_seq OWNER TO f4admin;

--
-- Name: files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: f4admin
--

ALTER SEQUENCE public.files_id_seq OWNED BY public.files.id;


--
-- Name: files_related_morphs; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.files_related_morphs (
    file_id integer,
    related_id integer,
    related_type character varying(255),
    field character varying(255),
    "order" integer
);


ALTER TABLE public.files_related_morphs OWNER TO f4admin;

--
-- Name: i18n_locale; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.i18n_locale (
    id integer NOT NULL,
    name character varying(255),
    code character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);


ALTER TABLE public.i18n_locale OWNER TO f4admin;

--
-- Name: i18n_locale_id_seq; Type: SEQUENCE; Schema: public; Owner: f4admin
--

CREATE SEQUENCE public.i18n_locale_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i18n_locale_id_seq OWNER TO f4admin;

--
-- Name: i18n_locale_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: f4admin
--

ALTER SEQUENCE public.i18n_locale_id_seq OWNED BY public.i18n_locale.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    title character varying(255),
    description text,
    content text,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    slug character varying(255),
    is_pinned boolean,
    is_blocked boolean,
    is_trending boolean,
    is_locked boolean
);


ALTER TABLE public.posts OWNER TO f4admin;

--
-- Name: posts_categories_links; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.posts_categories_links (
    post_id integer,
    category_id integer
);


ALTER TABLE public.posts_categories_links OWNER TO f4admin;

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: f4admin
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_id_seq OWNER TO f4admin;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: f4admin
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: posts_tags_links; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.posts_tags_links (
    post_id integer,
    tag_id integer
);


ALTER TABLE public.posts_tags_links OWNER TO f4admin;

--
-- Name: posts_user_links; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.posts_user_links (
    post_id integer,
    user_id integer
);


ALTER TABLE public.posts_user_links OWNER TO f4admin;

--
-- Name: reactions; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.reactions (
    id integer NOT NULL,
    type character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);


ALTER TABLE public.reactions OWNER TO f4admin;

--
-- Name: reactions_id_seq; Type: SEQUENCE; Schema: public; Owner: f4admin
--

CREATE SEQUENCE public.reactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reactions_id_seq OWNER TO f4admin;

--
-- Name: reactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: f4admin
--

ALTER SEQUENCE public.reactions_id_seq OWNED BY public.reactions.id;


--
-- Name: reactions_post_links; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.reactions_post_links (
    reaction_id integer,
    post_id integer
);


ALTER TABLE public.reactions_post_links OWNER TO f4admin;

--
-- Name: reactions_user_links; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.reactions_user_links (
    reaction_id integer,
    user_id integer
);


ALTER TABLE public.reactions_user_links OWNER TO f4admin;

--
-- Name: strapi_api_tokens; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.strapi_api_tokens (
    id integer NOT NULL,
    name character varying(255),
    description character varying(255),
    type character varying(255),
    access_key character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);


ALTER TABLE public.strapi_api_tokens OWNER TO f4admin;

--
-- Name: strapi_api_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: f4admin
--

CREATE SEQUENCE public.strapi_api_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_api_tokens_id_seq OWNER TO f4admin;

--
-- Name: strapi_api_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: f4admin
--

ALTER SEQUENCE public.strapi_api_tokens_id_seq OWNED BY public.strapi_api_tokens.id;


--
-- Name: strapi_core_store_settings; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.strapi_core_store_settings (
    id integer NOT NULL,
    key character varying(255),
    value text,
    type character varying(255),
    environment character varying(255),
    tag character varying(255)
);


ALTER TABLE public.strapi_core_store_settings OWNER TO f4admin;

--
-- Name: strapi_core_store_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: f4admin
--

CREATE SEQUENCE public.strapi_core_store_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_core_store_settings_id_seq OWNER TO f4admin;

--
-- Name: strapi_core_store_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: f4admin
--

ALTER SEQUENCE public.strapi_core_store_settings_id_seq OWNED BY public.strapi_core_store_settings.id;


--
-- Name: strapi_database_schema; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.strapi_database_schema (
    id integer NOT NULL,
    schema json,
    "time" timestamp without time zone,
    hash character varying(255)
);


ALTER TABLE public.strapi_database_schema OWNER TO f4admin;

--
-- Name: strapi_database_schema_id_seq; Type: SEQUENCE; Schema: public; Owner: f4admin
--

CREATE SEQUENCE public.strapi_database_schema_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_database_schema_id_seq OWNER TO f4admin;

--
-- Name: strapi_database_schema_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: f4admin
--

ALTER SEQUENCE public.strapi_database_schema_id_seq OWNED BY public.strapi_database_schema.id;


--
-- Name: strapi_migrations; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.strapi_migrations (
    id integer NOT NULL,
    name character varying(255),
    "time" timestamp without time zone
);


ALTER TABLE public.strapi_migrations OWNER TO f4admin;

--
-- Name: strapi_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: f4admin
--

CREATE SEQUENCE public.strapi_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_migrations_id_seq OWNER TO f4admin;

--
-- Name: strapi_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: f4admin
--

ALTER SEQUENCE public.strapi_migrations_id_seq OWNED BY public.strapi_migrations.id;


--
-- Name: strapi_webhooks; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.strapi_webhooks (
    id integer NOT NULL,
    name character varying(255),
    url text,
    headers jsonb,
    events jsonb,
    enabled boolean
);


ALTER TABLE public.strapi_webhooks OWNER TO f4admin;

--
-- Name: strapi_webhooks_id_seq; Type: SEQUENCE; Schema: public; Owner: f4admin
--

CREATE SEQUENCE public.strapi_webhooks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_webhooks_id_seq OWNER TO f4admin;

--
-- Name: strapi_webhooks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: f4admin
--

ALTER SEQUENCE public.strapi_webhooks_id_seq OWNED BY public.strapi_webhooks.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    name character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);


ALTER TABLE public.tags OWNER TO f4admin;

--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: f4admin
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tags_id_seq OWNER TO f4admin;

--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: f4admin
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: up_permissions; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.up_permissions (
    id integer NOT NULL,
    action character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);


ALTER TABLE public.up_permissions OWNER TO f4admin;

--
-- Name: up_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: f4admin
--

CREATE SEQUENCE public.up_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.up_permissions_id_seq OWNER TO f4admin;

--
-- Name: up_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: f4admin
--

ALTER SEQUENCE public.up_permissions_id_seq OWNED BY public.up_permissions.id;


--
-- Name: up_permissions_role_links; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.up_permissions_role_links (
    permission_id integer,
    role_id integer
);


ALTER TABLE public.up_permissions_role_links OWNER TO f4admin;

--
-- Name: up_roles; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.up_roles (
    id integer NOT NULL,
    name character varying(255),
    description character varying(255),
    type character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);


ALTER TABLE public.up_roles OWNER TO f4admin;

--
-- Name: up_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: f4admin
--

CREATE SEQUENCE public.up_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.up_roles_id_seq OWNER TO f4admin;

--
-- Name: up_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: f4admin
--

ALTER SEQUENCE public.up_roles_id_seq OWNED BY public.up_roles.id;


--
-- Name: up_users; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.up_users (
    id integer NOT NULL,
    username character varying(255),
    email character varying(255),
    provider character varying(255),
    password character varying(255),
    reset_password_token character varying(255),
    confirmation_token character varying(255),
    confirmed boolean,
    blocked boolean,
    name character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);


ALTER TABLE public.up_users OWNER TO f4admin;

--
-- Name: up_users_id_seq; Type: SEQUENCE; Schema: public; Owner: f4admin
--

CREATE SEQUENCE public.up_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.up_users_id_seq OWNER TO f4admin;

--
-- Name: up_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: f4admin
--

ALTER SEQUENCE public.up_users_id_seq OWNED BY public.up_users.id;


--
-- Name: up_users_role_links; Type: TABLE; Schema: public; Owner: f4admin
--

CREATE TABLE public.up_users_role_links (
    user_id integer,
    role_id integer
);


ALTER TABLE public.up_users_role_links OWNER TO f4admin;

--
-- Name: admin_permissions id; Type: DEFAULT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.admin_permissions ALTER COLUMN id SET DEFAULT nextval('public.admin_permissions_id_seq'::regclass);


--
-- Name: admin_roles id; Type: DEFAULT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.admin_roles ALTER COLUMN id SET DEFAULT nextval('public.admin_roles_id_seq'::regclass);


--
-- Name: admin_users id; Type: DEFAULT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.admin_users ALTER COLUMN id SET DEFAULT nextval('public.admin_users_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: files id; Type: DEFAULT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.files ALTER COLUMN id SET DEFAULT nextval('public.files_id_seq'::regclass);


--
-- Name: i18n_locale id; Type: DEFAULT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.i18n_locale ALTER COLUMN id SET DEFAULT nextval('public.i18n_locale_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: reactions id; Type: DEFAULT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.reactions ALTER COLUMN id SET DEFAULT nextval('public.reactions_id_seq'::regclass);


--
-- Name: strapi_api_tokens id; Type: DEFAULT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.strapi_api_tokens ALTER COLUMN id SET DEFAULT nextval('public.strapi_api_tokens_id_seq'::regclass);


--
-- Name: strapi_core_store_settings id; Type: DEFAULT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.strapi_core_store_settings ALTER COLUMN id SET DEFAULT nextval('public.strapi_core_store_settings_id_seq'::regclass);


--
-- Name: strapi_database_schema id; Type: DEFAULT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.strapi_database_schema ALTER COLUMN id SET DEFAULT nextval('public.strapi_database_schema_id_seq'::regclass);


--
-- Name: strapi_migrations id; Type: DEFAULT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.strapi_migrations ALTER COLUMN id SET DEFAULT nextval('public.strapi_migrations_id_seq'::regclass);


--
-- Name: strapi_webhooks id; Type: DEFAULT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.strapi_webhooks ALTER COLUMN id SET DEFAULT nextval('public.strapi_webhooks_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Name: up_permissions id; Type: DEFAULT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.up_permissions ALTER COLUMN id SET DEFAULT nextval('public.up_permissions_id_seq'::regclass);


--
-- Name: up_roles id; Type: DEFAULT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.up_roles ALTER COLUMN id SET DEFAULT nextval('public.up_roles_id_seq'::regclass);


--
-- Name: up_users id; Type: DEFAULT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.up_users ALTER COLUMN id SET DEFAULT nextval('public.up_users_id_seq'::regclass);


--
-- Data for Name: admin_permissions; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.admin_permissions (id, action, subject, properties, conditions, created_at, updated_at, created_by_id, updated_by_id) FROM stdin;
1	plugin::upload.read	\N	{}	[]	2022-07-26 11:03:29.399	2022-07-26 11:03:29.399	\N	\N
2	plugin::upload.assets.create	\N	{}	[]	2022-07-26 11:03:29.405	2022-07-26 11:03:29.405	\N	\N
3	plugin::upload.assets.update	\N	{}	[]	2022-07-26 11:03:29.409	2022-07-26 11:03:29.409	\N	\N
4	plugin::upload.assets.download	\N	{}	[]	2022-07-26 11:03:29.422	2022-07-26 11:03:29.422	\N	\N
5	plugin::upload.assets.copy-link	\N	{}	[]	2022-07-26 11:03:29.426	2022-07-26 11:03:29.426	\N	\N
6	plugin::upload.read	\N	{}	["admin::is-creator"]	2022-07-26 11:03:29.431	2022-07-26 11:03:29.431	\N	\N
7	plugin::upload.assets.create	\N	{}	[]	2022-07-26 11:03:29.435	2022-07-26 11:03:29.435	\N	\N
8	plugin::upload.assets.update	\N	{}	["admin::is-creator"]	2022-07-26 11:03:29.449	2022-07-26 11:03:29.449	\N	\N
9	plugin::upload.assets.download	\N	{}	[]	2022-07-26 11:03:29.454	2022-07-26 11:03:29.454	\N	\N
10	plugin::upload.assets.copy-link	\N	{}	[]	2022-07-26 11:03:29.458	2022-07-26 11:03:29.458	\N	\N
14	plugin::content-manager.explorer.delete	plugin::users-permissions.user	{}	[]	2022-07-26 11:03:29.527	2022-07-26 11:03:29.527	\N	\N
15	plugin::content-manager.single-types.configure-view	\N	{}	[]	2022-07-26 11:03:29.531	2022-07-26 11:03:29.531	\N	\N
16	plugin::content-manager.collection-types.configure-view	\N	{}	[]	2022-07-26 11:03:29.535	2022-07-26 11:03:29.535	\N	\N
17	plugin::content-manager.components.configure-layout	\N	{}	[]	2022-07-26 11:03:29.543	2022-07-26 11:03:29.543	\N	\N
18	plugin::content-type-builder.read	\N	{}	[]	2022-07-26 11:03:29.549	2022-07-26 11:03:29.549	\N	\N
19	plugin::email.settings.read	\N	{}	[]	2022-07-26 11:03:29.553	2022-07-26 11:03:29.553	\N	\N
20	plugin::upload.read	\N	{}	[]	2022-07-26 11:03:29.558	2022-07-26 11:03:29.558	\N	\N
21	plugin::upload.assets.create	\N	{}	[]	2022-07-26 11:03:29.562	2022-07-26 11:03:29.562	\N	\N
22	plugin::upload.assets.update	\N	{}	[]	2022-07-26 11:03:29.584	2022-07-26 11:03:29.584	\N	\N
23	plugin::upload.assets.download	\N	{}	[]	2022-07-26 11:03:29.59	2022-07-26 11:03:29.59	\N	\N
24	plugin::upload.assets.copy-link	\N	{}	[]	2022-07-26 11:03:29.595	2022-07-26 11:03:29.595	\N	\N
25	plugin::upload.settings.read	\N	{}	[]	2022-07-26 11:03:29.6	2022-07-26 11:03:29.6	\N	\N
26	plugin::documentation.read	\N	{}	[]	2022-07-26 11:03:29.605	2022-07-26 11:03:29.605	\N	\N
27	plugin::documentation.settings.update	\N	{}	[]	2022-07-26 11:03:29.61	2022-07-26 11:03:29.61	\N	\N
28	plugin::documentation.settings.regenerate	\N	{}	[]	2022-07-26 11:03:29.621	2022-07-26 11:03:29.621	\N	\N
29	plugin::documentation.settings.read	\N	{}	[]	2022-07-26 11:03:29.629	2022-07-26 11:03:29.629	\N	\N
30	plugin::i18n.locale.create	\N	{}	[]	2022-07-26 11:03:29.643	2022-07-26 11:03:29.643	\N	\N
31	plugin::i18n.locale.read	\N	{}	[]	2022-07-26 11:03:29.65	2022-07-26 11:03:29.65	\N	\N
32	plugin::i18n.locale.update	\N	{}	[]	2022-07-26 11:03:29.66	2022-07-26 11:03:29.66	\N	\N
33	plugin::i18n.locale.delete	\N	{}	[]	2022-07-26 11:03:29.665	2022-07-26 11:03:29.665	\N	\N
34	plugin::users-permissions.roles.create	\N	{}	[]	2022-07-26 11:03:29.676	2022-07-26 11:03:29.676	\N	\N
35	plugin::users-permissions.roles.read	\N	{}	[]	2022-07-26 11:03:29.686	2022-07-26 11:03:29.686	\N	\N
36	plugin::users-permissions.roles.update	\N	{}	[]	2022-07-26 11:03:29.693	2022-07-26 11:03:29.693	\N	\N
37	plugin::users-permissions.roles.delete	\N	{}	[]	2022-07-26 11:03:29.698	2022-07-26 11:03:29.698	\N	\N
38	plugin::users-permissions.providers.read	\N	{}	[]	2022-07-26 11:03:29.706	2022-07-26 11:03:29.706	\N	\N
39	plugin::users-permissions.providers.update	\N	{}	[]	2022-07-26 11:03:29.717	2022-07-26 11:03:29.717	\N	\N
40	plugin::users-permissions.email-templates.read	\N	{}	[]	2022-07-26 11:03:29.721	2022-07-26 11:03:29.721	\N	\N
41	plugin::users-permissions.email-templates.update	\N	{}	[]	2022-07-26 11:03:29.725	2022-07-26 11:03:29.725	\N	\N
42	plugin::users-permissions.advanced-settings.read	\N	{}	[]	2022-07-26 11:03:29.733	2022-07-26 11:03:29.733	\N	\N
43	plugin::users-permissions.advanced-settings.update	\N	{}	[]	2022-07-26 11:03:29.738	2022-07-26 11:03:29.738	\N	\N
44	admin::marketplace.read	\N	{}	[]	2022-07-26 11:03:29.751	2022-07-26 11:03:29.751	\N	\N
45	admin::marketplace.plugins.install	\N	{}	[]	2022-07-26 11:03:29.756	2022-07-26 11:03:29.756	\N	\N
46	admin::marketplace.plugins.uninstall	\N	{}	[]	2022-07-26 11:03:29.76	2022-07-26 11:03:29.76	\N	\N
47	admin::webhooks.create	\N	{}	[]	2022-07-26 11:03:29.774	2022-07-26 11:03:29.774	\N	\N
48	admin::webhooks.read	\N	{}	[]	2022-07-26 11:03:29.785	2022-07-26 11:03:29.785	\N	\N
49	admin::webhooks.update	\N	{}	[]	2022-07-26 11:03:29.79	2022-07-26 11:03:29.79	\N	\N
50	admin::webhooks.delete	\N	{}	[]	2022-07-26 11:03:29.794	2022-07-26 11:03:29.794	\N	\N
51	admin::users.create	\N	{}	[]	2022-07-26 11:03:29.8	2022-07-26 11:03:29.8	\N	\N
52	admin::users.read	\N	{}	[]	2022-07-26 11:03:29.81	2022-07-26 11:03:29.81	\N	\N
53	admin::users.update	\N	{}	[]	2022-07-26 11:03:29.818	2022-07-26 11:03:29.818	\N	\N
54	admin::users.delete	\N	{}	[]	2022-07-26 11:03:29.839	2022-07-26 11:03:29.839	\N	\N
55	admin::roles.create	\N	{}	[]	2022-07-26 11:03:29.85	2022-07-26 11:03:29.85	\N	\N
56	admin::roles.read	\N	{}	[]	2022-07-26 11:03:29.861	2022-07-26 11:03:29.861	\N	\N
57	admin::roles.update	\N	{}	[]	2022-07-26 11:03:29.87	2022-07-26 11:03:29.87	\N	\N
58	admin::roles.delete	\N	{}	[]	2022-07-26 11:03:29.875	2022-07-26 11:03:29.875	\N	\N
59	admin::api-tokens.create	\N	{}	[]	2022-07-26 11:03:29.88	2022-07-26 11:03:29.88	\N	\N
60	admin::api-tokens.read	\N	{}	[]	2022-07-26 11:03:29.897	2022-07-26 11:03:29.897	\N	\N
61	admin::api-tokens.update	\N	{}	[]	2022-07-26 11:03:29.902	2022-07-26 11:03:29.902	\N	\N
62	admin::api-tokens.delete	\N	{}	[]	2022-07-26 11:03:29.919	2022-07-26 11:03:29.919	\N	\N
66	plugin::content-manager.explorer.delete	api::category.category	{}	[]	2022-07-26 11:08:57.042	2022-07-26 11:08:57.042	\N	\N
67	plugin::content-manager.explorer.publish	api::category.category	{}	[]	2022-07-26 11:08:57.048	2022-07-26 11:08:57.048	\N	\N
68	plugin::content-manager.explorer.create	api::category.category	{"fields": ["slug", "name", "description", "color", "posts"]}	[]	2022-07-26 11:12:00.207	2022-07-26 11:12:00.207	\N	\N
71	plugin::content-manager.explorer.read	api::category.category	{"fields": ["slug", "name", "description", "color", "posts"]}	[]	2022-07-26 11:12:00.232	2022-07-26 11:12:00.232	\N	\N
74	plugin::content-manager.explorer.update	api::category.category	{"fields": ["slug", "name", "description", "color", "posts"]}	[]	2022-07-26 11:12:00.262	2022-07-26 11:12:00.262	\N	\N
77	plugin::content-manager.explorer.delete	api::post.post	{}	[]	2022-07-26 11:12:00.286	2022-07-26 11:12:00.286	\N	\N
78	plugin::content-manager.explorer.publish	api::post.post	{}	[]	2022-07-26 11:12:00.294	2022-07-26 11:12:00.294	\N	\N
85	plugin::content-manager.explorer.delete	api::tag.tag	{}	[]	2022-07-26 11:13:35.95	2022-07-26 11:13:35.95	\N	\N
87	plugin::content-manager.explorer.create	api::tag.tag	{"fields": ["name", "posts"]}	[]	2022-07-26 11:17:42.78	2022-07-26 11:17:42.78	\N	\N
89	plugin::content-manager.explorer.read	api::tag.tag	{"fields": ["name", "posts"]}	[]	2022-07-26 11:17:42.796	2022-07-26 11:17:42.796	\N	\N
91	plugin::content-manager.explorer.update	api::tag.tag	{"fields": ["name", "posts"]}	[]	2022-07-26 11:17:42.808	2022-07-26 11:17:42.808	\N	\N
96	plugin::content-manager.explorer.create	api::reaction.reaction	{"fields": ["user", "post", "type"]}	[]	2022-07-26 14:48:19.853	2022-07-26 14:48:19.853	\N	\N
99	plugin::content-manager.explorer.read	api::reaction.reaction	{"fields": ["user", "post", "type"]}	[]	2022-07-26 14:48:19.877	2022-07-26 14:48:19.877	\N	\N
102	plugin::content-manager.explorer.update	api::reaction.reaction	{"fields": ["user", "post", "type"]}	[]	2022-07-26 14:48:19.902	2022-07-26 14:48:19.902	\N	\N
104	plugin::content-manager.explorer.delete	api::reaction.reaction	{}	[]	2022-07-26 14:48:19.914	2022-07-26 14:48:19.914	\N	\N
106	plugin::content-manager.explorer.create	plugin::users-permissions.user	{"fields": ["username", "email", "provider", "password", "resetPasswordToken", "confirmationToken", "confirmed", "blocked", "role", "picture", "name", "posts", "reactions", "comments"]}	[]	2022-07-26 14:56:45.622	2022-07-26 14:56:45.622	\N	\N
108	plugin::content-manager.explorer.read	plugin::users-permissions.user	{"fields": ["username", "email", "provider", "password", "resetPasswordToken", "confirmationToken", "confirmed", "blocked", "role", "picture", "name", "posts", "reactions", "comments"]}	[]	2022-07-26 14:56:45.638	2022-07-26 14:56:45.638	\N	\N
110	plugin::content-manager.explorer.update	plugin::users-permissions.user	{"fields": ["username", "email", "provider", "password", "resetPasswordToken", "confirmationToken", "confirmed", "blocked", "role", "picture", "name", "posts", "reactions", "comments"]}	[]	2022-07-26 14:56:45.649	2022-07-26 14:56:45.649	\N	\N
112	plugin::content-manager.explorer.delete	api::comment.comment	{}	[]	2022-07-26 14:56:45.663	2022-07-26 14:56:45.663	\N	\N
113	plugin::content-manager.explorer.publish	api::comment.comment	{}	[]	2022-07-26 14:56:45.67	2022-07-26 14:56:45.67	\N	\N
114	plugin::content-manager.explorer.create	api::comment.comment	{"fields": ["user", "content", "is_blocked", "post"]}	[]	2022-07-26 14:57:09.817	2022-07-26 14:57:09.817	\N	\N
116	plugin::content-manager.explorer.read	api::comment.comment	{"fields": ["user", "content", "is_blocked", "post"]}	[]	2022-07-26 14:57:09.832	2022-07-26 14:57:09.832	\N	\N
118	plugin::content-manager.explorer.update	api::comment.comment	{"fields": ["user", "content", "is_blocked", "post"]}	[]	2022-07-26 14:57:09.85	2022-07-26 14:57:09.85	\N	\N
120	plugin::content-manager.explorer.create	api::post.post	{"fields": ["title", "description", "content", "categories", "user", "tags", "slug", "reactions", "comments", "is_pinned", "is_blocked", "is_trending", "is_locked"]}	[]	2022-07-26 15:02:03.82	2022-07-26 15:02:03.82	\N	\N
121	plugin::content-manager.explorer.read	api::post.post	{"fields": ["title", "description", "content", "categories", "user", "tags", "slug", "reactions", "comments", "is_pinned", "is_blocked", "is_trending", "is_locked"]}	[]	2022-07-26 15:02:03.828	2022-07-26 15:02:03.828	\N	\N
122	plugin::content-manager.explorer.update	api::post.post	{"fields": ["title", "description", "content", "categories", "user", "tags", "slug", "reactions", "comments", "is_pinned", "is_blocked", "is_trending", "is_locked"]}	[]	2022-07-26 15:02:03.836	2022-07-26 15:02:03.836	\N	\N
\.


--
-- Data for Name: admin_permissions_role_links; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.admin_permissions_role_links (permission_id, role_id) FROM stdin;
1	2
2	2
3	2
4	2
5	2
6	3
7	3
8	3
9	3
10	3
14	1
15	1
16	1
17	1
18	1
19	1
20	1
21	1
22	1
23	1
24	1
25	1
26	1
27	1
28	1
29	1
30	1
31	1
32	1
33	1
34	1
35	1
36	1
37	1
38	1
39	1
40	1
41	1
42	1
43	1
44	1
45	1
46	1
47	1
48	1
49	1
50	1
51	1
52	1
53	1
54	1
55	1
56	1
57	1
58	1
59	1
60	1
61	1
62	1
66	1
67	1
68	1
71	1
74	1
77	1
78	1
85	1
87	1
89	1
91	1
96	1
99	1
102	1
104	1
106	1
108	1
110	1
112	1
113	1
114	1
116	1
118	1
120	1
121	1
122	1
\.


--
-- Data for Name: admin_roles; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.admin_roles (id, name, code, description, created_at, updated_at, created_by_id, updated_by_id) FROM stdin;
1	Super Admin	strapi-super-admin	Super Admins can access and manage all features and settings.	2022-07-26 11:03:29.38	2022-07-26 11:03:29.38	\N	\N
2	Editor	strapi-editor	Editors can manage and publish contents including those of other users.	2022-07-26 11:03:29.388	2022-07-26 11:03:29.388	\N	\N
3	Author	strapi-author	Authors can manage the content they have created.	2022-07-26 11:03:29.394	2022-07-26 11:03:29.394	\N	\N
\.


--
-- Data for Name: admin_users; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.admin_users (id, firstname, lastname, username, email, password, reset_password_token, registration_token, is_active, blocked, prefered_language, created_at, updated_at, created_by_id, updated_by_id) FROM stdin;
1	Admin	F4	\N	admin@gmail.com	$2a$10$bO58.qKDFPgAxxuTMelL1uQZ0dcq4vgnz0tpZZQzFHb4rFhXmg1hS	\N	\N	t	f	\N	2022-07-26 11:03:56.403	2022-07-26 11:03:56.403	\N	\N
\.


--
-- Data for Name: admin_users_roles_links; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.admin_users_roles_links (user_id, role_id) FROM stdin;
1	1
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.categories (id, slug, name, description, color, created_at, updated_at, published_at, created_by_id, updated_by_id) FROM stdin;
1	java	java	Java	#2e3192	2022-07-26 11:15:56.632	2022-07-26 11:15:57.007	2022-07-26 11:15:57.004	1	1
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.comments (id, content, is_blocked, created_at, updated_at, published_at, created_by_id, updated_by_id) FROM stdin;
1	<p>Good idea!</p>	f	2022-07-26 14:57:33.332	2022-07-26 14:57:59.487	2022-07-26 14:57:59.483	1	1
2	<p>Good idea!</p>	f	2022-07-26 14:58:05.854	2022-07-26 14:58:06.75	2022-07-26 14:58:06.747	1	1
\.


--
-- Data for Name: comments_post_links; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.comments_post_links (comment_id, post_id) FROM stdin;
1	2
2	2
\.


--
-- Data for Name: comments_user_links; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.comments_user_links (comment_id, user_id) FROM stdin;
1	1
2	1
\.


--
-- Data for Name: files; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.files (id, name, alternative_text, caption, width, height, formats, hash, ext, mime, size, url, preview_url, provider, provider_metadata, created_at, updated_at, created_by_id, updated_by_id) FROM stdin;
\.


--
-- Data for Name: files_related_morphs; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.files_related_morphs (file_id, related_id, related_type, field, "order") FROM stdin;
\.


--
-- Data for Name: i18n_locale; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.i18n_locale (id, name, code, created_at, updated_at, created_by_id, updated_by_id) FROM stdin;
1	English (en)	en	2022-07-26 11:03:29.244	2022-07-26 11:03:29.244	\N	\N
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.posts (id, title, description, content, created_at, updated_at, published_at, created_by_id, updated_by_id, slug, is_pinned, is_blocked, is_trending, is_locked) FROM stdin;
2	Design pattern in Java: Builder pattern	Builder pattern in Java	<p>Builder pattern in Java</p>	2022-07-26 15:07:49.612	2022-07-26 15:07:50.765	2022-07-26 15:07:50.757	1	1	design-pattern-in-java-builder-pattern	t	f	t	f
1	Design pattern in Java: Factory pattern	Factory pattern in Java	<p><strong>Get ready for Movember!</strong></p><p>&nbsp;</p><p>It’s time to channel your inner Magnum P.I., Ron Swanson or Hercule Poroit! It’s the time that all guys (or gals) love and all our partners hate It’s Movember!</p><p>Throughout November we will be inviting all community members to help raise awareness and funds for the lives of men affected by cancer and mental health problems via the Movember Foundation 10.</p><p><strong>How Does it Work?</strong></p><p>&nbsp;</p><p>Authors and customers with facial hair unite! Simply grow, groom, and share your facial hair during November! Even females can enter if they desire (be creative, ladies!). Be inspired by checking out last year’s highlights 28.</p>	2022-07-26 11:16:45.725	2022-07-26 15:11:13.409	2022-07-26 11:16:51.184	1	1	design-pattern-in-java-factory-pattern	f	f	t	t
3	Design pattern in Java: Singleton pattern	Singleton pattern in Java	<p>Trong bài viết này mình sẽ giúp các bạn trả lời 4 câu hỏi về Single pattern trong vòng 5 phút.</p><ol><li>Singleton Pattern là gì?</li><li>Tại sao cần dùng Singleton Pattern</li><li>Làm thế nào để implement Singleton Pattern</li><li>Có những cách nào để implement Singleton Pattern Liệu có đủ không nhỉ các bạn cùng theo dõi nhé</li></ol><h2 style="margin-left:0px;"><strong>1. Single Pattern là gì?</strong></h2><p>Theo Gang of Four patterns một cuốn sách rất nổi tiếng về design pattern thì Single Pattern là một design pattern trong số 5 design pattern thuộc nhóm Creational Design Pattern</p><p><br>&nbsp;</p>	2022-07-26 16:35:53.708	2022-07-26 16:36:14.094	2022-07-26 16:35:54.798	1	1	design-pattern-in-java-singleton-pattern	f	f	f	f
\.


--
-- Data for Name: posts_categories_links; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.posts_categories_links (post_id, category_id) FROM stdin;
2	1
1	1
3	1
\.


--
-- Data for Name: posts_tags_links; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.posts_tags_links (post_id, tag_id) FROM stdin;
2	2
2	3
1	2
1	3
3	3
\.


--
-- Data for Name: posts_user_links; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.posts_user_links (post_id, user_id) FROM stdin;
2	1
1	1
3	1
\.


--
-- Data for Name: reactions; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.reactions (id, type, created_at, updated_at, created_by_id, updated_by_id) FROM stdin;
2	LIKE	2022-07-26 14:49:27.716	2022-07-26 15:58:50.114	1	1
4	DISLIKE	2022-07-26 15:58:57.008	2022-07-26 15:58:57.008	1	1
\.


--
-- Data for Name: reactions_post_links; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.reactions_post_links (reaction_id, post_id) FROM stdin;
2	2
4	2
\.


--
-- Data for Name: reactions_user_links; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.reactions_user_links (reaction_id, user_id) FROM stdin;
2	1
4	1
\.


--
-- Data for Name: strapi_api_tokens; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.strapi_api_tokens (id, name, description, type, access_key, created_at, updated_at, created_by_id, updated_by_id) FROM stdin;
1	webapi		read-only	072bdc523283ccda4698c490212471e1adf216ec32307e7f9732fdcce4900977c1ddea53e60c37efc9cb84f836b2b9ad48ee79f78f4cd5104597a50eda8864bf	2022-07-26 11:06:15.536	2022-07-26 11:06:21.564	\N	\N
2	webapi-full		full-access	54c3522102f0ecbc2244d2988e6b507c84f8a1c5bce3d37771c9d8126e4476d0a13700573cf43a183fd717a3b388911c419de429927fe70900d8388702090f58	2022-07-26 11:06:28.628	2022-07-26 11:06:30.225	\N	\N
\.


--
-- Data for Name: strapi_core_store_settings; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.strapi_core_store_settings (id, key, value, type, environment, tag) FROM stdin;
2	plugin_content_manager_configuration_content_types::admin::permission	{"uid":"admin::permission","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"action","defaultSortBy":"action","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"action":{"edit":{"label":"action","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"action","searchable":true,"sortable":true}},"subject":{"edit":{"label":"subject","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"subject","searchable":true,"sortable":true}},"properties":{"edit":{"label":"properties","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"properties","searchable":false,"sortable":false}},"conditions":{"edit":{"label":"conditions","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"conditions","searchable":false,"sortable":false}},"role":{"edit":{"label":"role","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"role","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}}},"layouts":{"list":["id","action","subject","role"],"editRelations":["role"],"edit":[[{"name":"action","size":6},{"name":"subject","size":6}],[{"name":"properties","size":12}],[{"name":"conditions","size":12}]]}}	object	\N	\N
3	plugin_content_manager_configuration_content_types::admin::role	{"uid":"admin::role","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"code":{"edit":{"label":"code","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"code","searchable":true,"sortable":true}},"description":{"edit":{"label":"description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"description","searchable":true,"sortable":true}},"users":{"edit":{"label":"users","description":"","placeholder":"","visible":true,"editable":true,"mainField":"firstname"},"list":{"label":"users","searchable":false,"sortable":false}},"permissions":{"edit":{"label":"permissions","description":"","placeholder":"","visible":true,"editable":true,"mainField":"action"},"list":{"label":"permissions","searchable":false,"sortable":false}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","code","description"],"editRelations":["users","permissions"],"edit":[[{"name":"name","size":6},{"name":"code","size":6}],[{"name":"description","size":6}]]}}	object	\N	\N
4	plugin_content_manager_configuration_content_types::admin::user	{"uid":"admin::user","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"firstname","defaultSortBy":"firstname","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"firstname":{"edit":{"label":"firstname","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"firstname","searchable":true,"sortable":true}},"lastname":{"edit":{"label":"lastname","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"lastname","searchable":true,"sortable":true}},"username":{"edit":{"label":"username","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"username","searchable":true,"sortable":true}},"email":{"edit":{"label":"email","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"email","searchable":true,"sortable":true}},"password":{"edit":{"label":"password","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"password","searchable":true,"sortable":true}},"resetPasswordToken":{"edit":{"label":"resetPasswordToken","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"resetPasswordToken","searchable":true,"sortable":true}},"registrationToken":{"edit":{"label":"registrationToken","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"registrationToken","searchable":true,"sortable":true}},"isActive":{"edit":{"label":"isActive","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"isActive","searchable":true,"sortable":true}},"roles":{"edit":{"label":"roles","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"roles","searchable":false,"sortable":false}},"blocked":{"edit":{"label":"blocked","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"blocked","searchable":true,"sortable":true}},"preferedLanguage":{"edit":{"label":"preferedLanguage","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"preferedLanguage","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}}},"layouts":{"list":["id","firstname","lastname","username"],"editRelations":["roles"],"edit":[[{"name":"firstname","size":6},{"name":"lastname","size":6}],[{"name":"username","size":6},{"name":"email","size":6}],[{"name":"password","size":6},{"name":"resetPasswordToken","size":6}],[{"name":"registrationToken","size":6},{"name":"isActive","size":4}],[{"name":"blocked","size":4},{"name":"preferedLanguage","size":6}]]}}	object	\N	\N
5	plugin_content_manager_configuration_content_types::admin::api-token	{"uid":"admin::api-token","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"description":{"edit":{"label":"description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"description","searchable":true,"sortable":true}},"type":{"edit":{"label":"type","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"type","searchable":true,"sortable":true}},"accessKey":{"edit":{"label":"accessKey","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"accessKey","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","description","type"],"editRelations":[],"edit":[[{"name":"name","size":6},{"name":"description","size":6}],[{"name":"type","size":6},{"name":"accessKey","size":6}]]}}	object	\N	\N
6	plugin_content_manager_configuration_content_types::plugin::upload.file	{"uid":"plugin::upload.file","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"alternativeText":{"edit":{"label":"alternativeText","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"alternativeText","searchable":true,"sortable":true}},"caption":{"edit":{"label":"caption","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"caption","searchable":true,"sortable":true}},"width":{"edit":{"label":"width","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"width","searchable":true,"sortable":true}},"height":{"edit":{"label":"height","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"height","searchable":true,"sortable":true}},"formats":{"edit":{"label":"formats","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"formats","searchable":false,"sortable":false}},"hash":{"edit":{"label":"hash","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"hash","searchable":true,"sortable":true}},"ext":{"edit":{"label":"ext","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"ext","searchable":true,"sortable":true}},"mime":{"edit":{"label":"mime","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"mime","searchable":true,"sortable":true}},"size":{"edit":{"label":"size","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"size","searchable":true,"sortable":true}},"url":{"edit":{"label":"url","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"url","searchable":true,"sortable":true}},"previewUrl":{"edit":{"label":"previewUrl","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"previewUrl","searchable":true,"sortable":true}},"provider":{"edit":{"label":"provider","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"provider","searchable":true,"sortable":true}},"provider_metadata":{"edit":{"label":"provider_metadata","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"provider_metadata","searchable":false,"sortable":false}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","alternativeText","caption"],"editRelations":[],"edit":[[{"name":"name","size":6},{"name":"alternativeText","size":6}],[{"name":"caption","size":6},{"name":"width","size":4}],[{"name":"height","size":4}],[{"name":"formats","size":12}],[{"name":"hash","size":6},{"name":"ext","size":6}],[{"name":"mime","size":6},{"name":"size","size":4}],[{"name":"url","size":6},{"name":"previewUrl","size":6}],[{"name":"provider","size":6}],[{"name":"provider_metadata","size":12}]]}}	object	\N	\N
7	plugin_content_manager_configuration_content_types::plugin::i18n.locale	{"uid":"plugin::i18n.locale","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"code":{"edit":{"label":"code","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"code","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","code","createdAt"],"editRelations":[],"edit":[[{"name":"name","size":6},{"name":"code","size":6}]]}}	object	\N	\N
1	strapi_content_types_schema	{"admin::permission":{"collectionName":"admin_permissions","info":{"name":"Permission","description":"","singularName":"permission","pluralName":"permissions","displayName":"Permission"},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"action":{"type":"string","minLength":1,"configurable":false,"required":true},"subject":{"type":"string","minLength":1,"configurable":false,"required":false},"properties":{"type":"json","configurable":false,"required":false,"default":{}},"conditions":{"type":"json","configurable":false,"required":false,"default":[]},"role":{"configurable":false,"type":"relation","relation":"manyToOne","inversedBy":"permissions","target":"admin::role"},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true}},"kind":"collectionType","__schema__":{"collectionName":"admin_permissions","info":{"name":"Permission","description":"","singularName":"permission","pluralName":"permissions","displayName":"Permission"},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"action":{"type":"string","minLength":1,"configurable":false,"required":true},"subject":{"type":"string","minLength":1,"configurable":false,"required":false},"properties":{"type":"json","configurable":false,"required":false,"default":{}},"conditions":{"type":"json","configurable":false,"required":false,"default":[]},"role":{"configurable":false,"type":"relation","relation":"manyToOne","inversedBy":"permissions","target":"admin::role"}},"kind":"collectionType"},"modelType":"contentType","modelName":"permission","connection":"default","uid":"admin::permission","plugin":"admin","globalId":"AdminPermission"},"admin::user":{"collectionName":"admin_users","info":{"name":"User","description":"","singularName":"user","pluralName":"users","displayName":"User"},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"firstname":{"type":"string","unique":false,"minLength":1,"configurable":false,"required":false},"lastname":{"type":"string","unique":false,"minLength":1,"configurable":false,"required":false},"username":{"type":"string","unique":false,"configurable":false,"required":false},"email":{"type":"email","minLength":6,"configurable":false,"required":true,"unique":true,"private":true},"password":{"type":"password","minLength":6,"configurable":false,"required":false,"private":true},"resetPasswordToken":{"type":"string","configurable":false,"private":true},"registrationToken":{"type":"string","configurable":false,"private":true},"isActive":{"type":"boolean","default":false,"configurable":false,"private":true},"roles":{"configurable":false,"private":true,"type":"relation","relation":"manyToMany","inversedBy":"users","target":"admin::role","collectionName":"strapi_users_roles"},"blocked":{"type":"boolean","default":false,"configurable":false,"private":true},"preferedLanguage":{"type":"string","configurable":false,"required":false},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true}},"kind":"collectionType","__schema__":{"collectionName":"admin_users","info":{"name":"User","description":"","singularName":"user","pluralName":"users","displayName":"User"},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"firstname":{"type":"string","unique":false,"minLength":1,"configurable":false,"required":false},"lastname":{"type":"string","unique":false,"minLength":1,"configurable":false,"required":false},"username":{"type":"string","unique":false,"configurable":false,"required":false},"email":{"type":"email","minLength":6,"configurable":false,"required":true,"unique":true,"private":true},"password":{"type":"password","minLength":6,"configurable":false,"required":false,"private":true},"resetPasswordToken":{"type":"string","configurable":false,"private":true},"registrationToken":{"type":"string","configurable":false,"private":true},"isActive":{"type":"boolean","default":false,"configurable":false,"private":true},"roles":{"configurable":false,"private":true,"type":"relation","relation":"manyToMany","inversedBy":"users","target":"admin::role","collectionName":"strapi_users_roles"},"blocked":{"type":"boolean","default":false,"configurable":false,"private":true},"preferedLanguage":{"type":"string","configurable":false,"required":false}},"kind":"collectionType"},"modelType":"contentType","modelName":"user","connection":"default","uid":"admin::user","plugin":"admin","globalId":"AdminUser"},"admin::role":{"collectionName":"admin_roles","info":{"name":"Role","description":"","singularName":"role","pluralName":"roles","displayName":"Role"},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":1,"unique":true,"configurable":false,"required":true},"code":{"type":"string","minLength":1,"unique":true,"configurable":false,"required":true},"description":{"type":"string","configurable":false},"users":{"configurable":false,"type":"relation","relation":"manyToMany","mappedBy":"roles","target":"admin::user"},"permissions":{"configurable":false,"type":"relation","relation":"oneToMany","mappedBy":"role","target":"admin::permission"},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true}},"kind":"collectionType","__schema__":{"collectionName":"admin_roles","info":{"name":"Role","description":"","singularName":"role","pluralName":"roles","displayName":"Role"},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":1,"unique":true,"configurable":false,"required":true},"code":{"type":"string","minLength":1,"unique":true,"configurable":false,"required":true},"description":{"type":"string","configurable":false},"users":{"configurable":false,"type":"relation","relation":"manyToMany","mappedBy":"roles","target":"admin::user"},"permissions":{"configurable":false,"type":"relation","relation":"oneToMany","mappedBy":"role","target":"admin::permission"}},"kind":"collectionType"},"modelType":"contentType","modelName":"role","connection":"default","uid":"admin::role","plugin":"admin","globalId":"AdminRole"},"admin::api-token":{"collectionName":"strapi_api_tokens","info":{"name":"Api Token","singularName":"api-token","pluralName":"api-tokens","displayName":"Api Token","description":""},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":1,"configurable":false,"required":true},"description":{"type":"string","minLength":1,"configurable":false,"required":false,"default":""},"type":{"type":"enumeration","enum":["read-only","full-access"],"configurable":false,"required":false,"default":"read-only"},"accessKey":{"type":"string","minLength":1,"configurable":false,"required":true},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true}},"kind":"collectionType","__schema__":{"collectionName":"strapi_api_tokens","info":{"name":"Api Token","singularName":"api-token","pluralName":"api-tokens","displayName":"Api Token","description":""},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":1,"configurable":false,"required":true},"description":{"type":"string","minLength":1,"configurable":false,"required":false,"default":""},"type":{"type":"enumeration","enum":["read-only","full-access"],"configurable":false,"required":false,"default":"read-only"},"accessKey":{"type":"string","minLength":1,"configurable":false,"required":true}},"kind":"collectionType"},"modelType":"contentType","modelName":"api-token","connection":"default","uid":"admin::api-token","plugin":"admin","globalId":"AdminApiToken"},"plugin::upload.file":{"collectionName":"files","info":{"singularName":"file","pluralName":"files","displayName":"File","description":""},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","configurable":false,"required":true},"alternativeText":{"type":"string","configurable":false},"caption":{"type":"string","configurable":false},"width":{"type":"integer","configurable":false},"height":{"type":"integer","configurable":false},"formats":{"type":"json","configurable":false},"hash":{"type":"string","configurable":false,"required":true},"ext":{"type":"string","configurable":false},"mime":{"type":"string","configurable":false,"required":true},"size":{"type":"decimal","configurable":false,"required":true},"url":{"type":"string","configurable":false,"required":true},"previewUrl":{"type":"string","configurable":false},"provider":{"type":"string","configurable":false,"required":true},"provider_metadata":{"type":"json","configurable":false},"related":{"type":"relation","relation":"morphToMany","configurable":false},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true}},"kind":"collectionType","__schema__":{"collectionName":"files","info":{"singularName":"file","pluralName":"files","displayName":"File","description":""},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","configurable":false,"required":true},"alternativeText":{"type":"string","configurable":false},"caption":{"type":"string","configurable":false},"width":{"type":"integer","configurable":false},"height":{"type":"integer","configurable":false},"formats":{"type":"json","configurable":false},"hash":{"type":"string","configurable":false,"required":true},"ext":{"type":"string","configurable":false},"mime":{"type":"string","configurable":false,"required":true},"size":{"type":"decimal","configurable":false,"required":true},"url":{"type":"string","configurable":false,"required":true},"previewUrl":{"type":"string","configurable":false},"provider":{"type":"string","configurable":false,"required":true},"provider_metadata":{"type":"json","configurable":false},"related":{"type":"relation","relation":"morphToMany","configurable":false}},"kind":"collectionType"},"modelType":"contentType","modelName":"file","connection":"default","uid":"plugin::upload.file","plugin":"upload","globalId":"UploadFile"},"plugin::i18n.locale":{"info":{"singularName":"locale","pluralName":"locales","collectionName":"locales","displayName":"Locale","description":""},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","min":1,"max":50,"configurable":false},"code":{"type":"string","unique":true,"configurable":false},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true}},"kind":"collectionType","__schema__":{"info":{"singularName":"locale","pluralName":"locales","collectionName":"locales","displayName":"Locale","description":""},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","min":1,"max":50,"configurable":false},"code":{"type":"string","unique":true,"configurable":false}},"kind":"collectionType"},"modelType":"contentType","modelName":"locale","connection":"default","uid":"plugin::i18n.locale","plugin":"i18n","collectionName":"i18n_locale","globalId":"I18NLocale"},"plugin::users-permissions.permission":{"collectionName":"up_permissions","info":{"name":"permission","description":"","singularName":"permission","pluralName":"permissions","displayName":"Permission"},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"action":{"type":"string","required":true,"configurable":false},"role":{"type":"relation","relation":"manyToOne","target":"plugin::users-permissions.role","inversedBy":"permissions","configurable":false},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true}},"kind":"collectionType","__schema__":{"collectionName":"up_permissions","info":{"name":"permission","description":"","singularName":"permission","pluralName":"permissions","displayName":"Permission"},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"action":{"type":"string","required":true,"configurable":false},"role":{"type":"relation","relation":"manyToOne","target":"plugin::users-permissions.role","inversedBy":"permissions","configurable":false}},"kind":"collectionType"},"modelType":"contentType","modelName":"permission","connection":"default","uid":"plugin::users-permissions.permission","plugin":"users-permissions","globalId":"UsersPermissionsPermission"},"plugin::users-permissions.role":{"collectionName":"up_roles","info":{"name":"role","description":"","singularName":"role","pluralName":"roles","displayName":"Role"},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":3,"required":true,"configurable":false},"description":{"type":"string","configurable":false},"type":{"type":"string","unique":true,"configurable":false},"permissions":{"type":"relation","relation":"oneToMany","target":"plugin::users-permissions.permission","mappedBy":"role","configurable":false},"users":{"type":"relation","relation":"oneToMany","target":"plugin::users-permissions.user","mappedBy":"role","configurable":false},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true}},"kind":"collectionType","__schema__":{"collectionName":"up_roles","info":{"name":"role","description":"","singularName":"role","pluralName":"roles","displayName":"Role"},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":3,"required":true,"configurable":false},"description":{"type":"string","configurable":false},"type":{"type":"string","unique":true,"configurable":false},"permissions":{"type":"relation","relation":"oneToMany","target":"plugin::users-permissions.permission","mappedBy":"role","configurable":false},"users":{"type":"relation","relation":"oneToMany","target":"plugin::users-permissions.user","mappedBy":"role","configurable":false}},"kind":"collectionType"},"modelType":"contentType","modelName":"role","connection":"default","uid":"plugin::users-permissions.role","plugin":"users-permissions","globalId":"UsersPermissionsRole"},"plugin::users-permissions.user":{"collectionName":"up_users","info":{"name":"user","description":"","singularName":"user","pluralName":"users","displayName":"User"},"options":{"draftAndPublish":false,"timestamps":true},"attributes":{"username":{"type":"string","minLength":3,"unique":true,"configurable":false,"required":true},"email":{"type":"email","minLength":6,"configurable":false,"required":true},"provider":{"type":"string","configurable":false},"password":{"type":"password","minLength":6,"configurable":false,"private":true},"resetPasswordToken":{"type":"string","configurable":false,"private":true},"confirmationToken":{"type":"string","configurable":false,"private":true},"confirmed":{"type":"boolean","default":false,"configurable":false},"blocked":{"type":"boolean","default":false,"configurable":false},"role":{"type":"relation","relation":"manyToOne","target":"plugin::users-permissions.role","inversedBy":"users","configurable":false},"picture":{"allowedTypes":["images","files","videos","audios"],"type":"media","multiple":false},"name":{"type":"string"},"posts":{"type":"relation","relation":"oneToMany","target":"api::post.post","mappedBy":"user"},"reactions":{"type":"relation","relation":"oneToMany","target":"api::reaction.reaction","mappedBy":"user"},"comments":{"type":"relation","relation":"oneToMany","target":"api::comment.comment","mappedBy":"user"},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true}},"config":{"attributes":{"resetPasswordToken":{"hidden":true},"confirmationToken":{"hidden":true},"provider":{"hidden":true}}},"kind":"collectionType","__filename__":"schema.json","__schema__":{"collectionName":"up_users","info":{"name":"user","description":"","singularName":"user","pluralName":"users","displayName":"User"},"options":{"draftAndPublish":false,"timestamps":true},"attributes":{"username":{"type":"string","minLength":3,"unique":true,"configurable":false,"required":true},"email":{"type":"email","minLength":6,"configurable":false,"required":true},"provider":{"type":"string","configurable":false},"password":{"type":"password","minLength":6,"configurable":false,"private":true},"resetPasswordToken":{"type":"string","configurable":false,"private":true},"confirmationToken":{"type":"string","configurable":false,"private":true},"confirmed":{"type":"boolean","default":false,"configurable":false},"blocked":{"type":"boolean","default":false,"configurable":false},"role":{"type":"relation","relation":"manyToOne","target":"plugin::users-permissions.role","inversedBy":"users","configurable":false},"picture":{"allowedTypes":["images","files","videos","audios"],"type":"media","multiple":false},"name":{"type":"string"},"posts":{"type":"relation","relation":"oneToMany","target":"api::post.post","mappedBy":"user"},"reactions":{"type":"relation","relation":"oneToMany","target":"api::reaction.reaction","mappedBy":"user"},"comments":{"type":"relation","relation":"oneToMany","target":"api::comment.comment","mappedBy":"user"}},"kind":"collectionType"},"modelType":"contentType","modelName":"user","connection":"default","uid":"plugin::users-permissions.user","plugin":"users-permissions","globalId":"UsersPermissionsUser"},"api::category.category":{"kind":"collectionType","collectionName":"categories","info":{"singularName":"category","pluralName":"categories","displayName":"Category"},"options":{"draftAndPublish":true},"pluginOptions":{},"attributes":{"slug":{"type":"uid","targetField":"name","required":true},"name":{"type":"string","required":true},"description":{"type":"text"},"color":{"type":"string"},"posts":{"type":"relation","relation":"manyToMany","target":"api::post.post","mappedBy":"categories"},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":false},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true}},"__schema__":{"collectionName":"categories","info":{"singularName":"category","pluralName":"categories","displayName":"Category"},"options":{"draftAndPublish":true},"pluginOptions":{},"attributes":{"slug":{"type":"uid","targetField":"name","required":true},"name":{"type":"string","required":true},"description":{"type":"text"},"color":{"type":"string"},"posts":{"type":"relation","relation":"manyToMany","target":"api::post.post","mappedBy":"categories"}},"kind":"collectionType"},"modelType":"contentType","modelName":"category","connection":"default","uid":"api::category.category","apiName":"category","globalId":"Category","actions":{},"lifecycles":{}},"api::comment.comment":{"kind":"collectionType","collectionName":"comments","info":{"singularName":"comment","pluralName":"comments","displayName":"Comment","description":""},"options":{"draftAndPublish":true},"pluginOptions":{},"attributes":{"user":{"type":"relation","relation":"manyToOne","target":"plugin::users-permissions.user","inversedBy":"comments"},"content":{"type":"richtext"},"is_blocked":{"type":"boolean","default":false},"post":{"type":"relation","relation":"manyToOne","target":"api::post.post","inversedBy":"comments"},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":false},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true}},"__schema__":{"collectionName":"comments","info":{"singularName":"comment","pluralName":"comments","displayName":"Comment","description":""},"options":{"draftAndPublish":true},"pluginOptions":{},"attributes":{"user":{"type":"relation","relation":"manyToOne","target":"plugin::users-permissions.user","inversedBy":"comments"},"content":{"type":"richtext"},"is_blocked":{"type":"boolean","default":false},"post":{"type":"relation","relation":"manyToOne","target":"api::post.post","inversedBy":"comments"}},"kind":"collectionType"},"modelType":"contentType","modelName":"comment","connection":"default","uid":"api::comment.comment","apiName":"comment","globalId":"Comment","actions":{},"lifecycles":{}},"api::post.post":{"kind":"collectionType","collectionName":"posts","info":{"singularName":"post","pluralName":"posts","displayName":"Post","description":""},"options":{"draftAndPublish":true},"pluginOptions":{},"attributes":{"title":{"type":"string"},"description":{"type":"text"},"content":{"type":"richtext"},"categories":{"type":"relation","relation":"manyToMany","target":"api::category.category","inversedBy":"posts"},"user":{"type":"relation","relation":"manyToOne","target":"plugin::users-permissions.user","inversedBy":"posts"},"tags":{"type":"relation","relation":"manyToMany","target":"api::tag.tag","inversedBy":"posts"},"slug":{"type":"uid","targetField":"title"},"reactions":{"type":"relation","relation":"oneToMany","target":"api::reaction.reaction","mappedBy":"post"},"comments":{"type":"relation","relation":"oneToMany","target":"api::comment.comment","mappedBy":"post"},"is_pinned":{"type":"boolean","default":false},"is_blocked":{"type":"boolean","default":false},"is_trending":{"type":"boolean","default":false},"is_locked":{"type":"boolean","default":false},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":false},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true}},"__schema__":{"collectionName":"posts","info":{"singularName":"post","pluralName":"posts","displayName":"Post","description":""},"options":{"draftAndPublish":true},"pluginOptions":{},"attributes":{"title":{"type":"string"},"description":{"type":"text"},"content":{"type":"richtext"},"categories":{"type":"relation","relation":"manyToMany","target":"api::category.category","inversedBy":"posts"},"user":{"type":"relation","relation":"manyToOne","target":"plugin::users-permissions.user","inversedBy":"posts"},"tags":{"type":"relation","relation":"manyToMany","target":"api::tag.tag","inversedBy":"posts"},"slug":{"type":"uid","targetField":"title"},"reactions":{"type":"relation","relation":"oneToMany","target":"api::reaction.reaction","mappedBy":"post"},"comments":{"type":"relation","relation":"oneToMany","target":"api::comment.comment","mappedBy":"post"},"is_pinned":{"type":"boolean","default":false},"is_blocked":{"type":"boolean","default":false},"is_trending":{"type":"boolean","default":false},"is_locked":{"type":"boolean","default":false}},"kind":"collectionType"},"modelType":"contentType","modelName":"post","connection":"default","uid":"api::post.post","apiName":"post","globalId":"Post","actions":{},"lifecycles":{}},"api::reaction.reaction":{"kind":"collectionType","collectionName":"reactions","info":{"singularName":"reaction","pluralName":"reactions","displayName":"Reaction","description":""},"options":{"draftAndPublish":false},"pluginOptions":{},"attributes":{"user":{"type":"relation","relation":"manyToOne","target":"plugin::users-permissions.user","inversedBy":"reactions"},"post":{"type":"relation","relation":"manyToOne","target":"api::post.post","inversedBy":"reactions"},"type":{"type":"string","default":"L","required":true},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true}},"__schema__":{"collectionName":"reactions","info":{"singularName":"reaction","pluralName":"reactions","displayName":"Reaction","description":""},"options":{"draftAndPublish":false},"pluginOptions":{},"attributes":{"user":{"type":"relation","relation":"manyToOne","target":"plugin::users-permissions.user","inversedBy":"reactions"},"post":{"type":"relation","relation":"manyToOne","target":"api::post.post","inversedBy":"reactions"},"type":{"type":"string","default":"L","required":true}},"kind":"collectionType"},"modelType":"contentType","modelName":"reaction","connection":"default","uid":"api::reaction.reaction","apiName":"reaction","globalId":"Reaction","actions":{},"lifecycles":{}},"api::tag.tag":{"kind":"collectionType","collectionName":"tags","info":{"singularName":"tag","pluralName":"tags","displayName":"Tag","description":""},"options":{"draftAndPublish":false},"pluginOptions":{},"attributes":{"name":{"type":"string"},"posts":{"type":"relation","relation":"manyToMany","target":"api::post.post","mappedBy":"tags"},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true}},"__schema__":{"collectionName":"tags","info":{"singularName":"tag","pluralName":"tags","displayName":"Tag","description":""},"options":{"draftAndPublish":false},"pluginOptions":{},"attributes":{"name":{"type":"string"},"posts":{"type":"relation","relation":"manyToMany","target":"api::post.post","mappedBy":"tags"}},"kind":"collectionType"},"modelType":"contentType","modelName":"tag","connection":"default","uid":"api::tag.tag","apiName":"tag","globalId":"Tag","actions":{},"lifecycles":{}}}	object	\N	\N
8	plugin_content_manager_configuration_content_types::plugin::users-permissions.permission	{"uid":"plugin::users-permissions.permission","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"action","defaultSortBy":"action","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"action":{"edit":{"label":"action","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"action","searchable":true,"sortable":true}},"role":{"edit":{"label":"role","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"role","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}}},"layouts":{"list":["id","action","role","createdAt"],"editRelations":["role"],"edit":[[{"name":"action","size":6}]]}}	object	\N	\N
9	plugin_content_manager_configuration_content_types::plugin::users-permissions.role	{"uid":"plugin::users-permissions.role","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"description":{"edit":{"label":"description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"description","searchable":true,"sortable":true}},"type":{"edit":{"label":"type","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"type","searchable":true,"sortable":true}},"permissions":{"edit":{"label":"permissions","description":"","placeholder":"","visible":true,"editable":true,"mainField":"action"},"list":{"label":"permissions","searchable":false,"sortable":false}},"users":{"edit":{"label":"users","description":"","placeholder":"","visible":true,"editable":true,"mainField":"username"},"list":{"label":"users","searchable":false,"sortable":false}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","description","type"],"editRelations":["permissions","users"],"edit":[[{"name":"name","size":6},{"name":"description","size":6}],[{"name":"type","size":6}]]}}	object	\N	\N
11	plugin_upload_settings	{"sizeOptimization":true,"responsiveDimensions":true,"autoOrientation":false}	object	\N	\N
12	plugin_documentation_config	{"restrictedAccess":false}	object	\N	\N
13	plugin_i18n_default_locale	"en"	string	\N	\N
14	plugin_users-permissions_grant	{"email":{"enabled":true,"icon":"envelope"},"discord":{"enabled":false,"icon":"discord","key":"","secret":"","callback":"api/auth/discord/callback","scope":["identify","email"]},"facebook":{"enabled":false,"icon":"facebook-square","key":"","secret":"","callback":"api/auth/facebook/callback","scope":["email"]},"google":{"enabled":false,"icon":"google","key":"","secret":"","callback":"api/auth/google/callback","scope":["email"]},"github":{"enabled":false,"icon":"github","key":"","secret":"","callback":"api/auth/github/callback","scope":["user","user:email"]},"microsoft":{"enabled":false,"icon":"windows","key":"","secret":"","callback":"api/auth/microsoft/callback","scope":["user.read"]},"twitter":{"enabled":false,"icon":"twitter","key":"","secret":"","callback":"api/auth/twitter/callback"},"instagram":{"enabled":false,"icon":"instagram","key":"","secret":"","callback":"api/auth/instagram/callback","scope":["user_profile"]},"vk":{"enabled":false,"icon":"vk","key":"","secret":"","callback":"api/auth/vk/callback","scope":["email"]},"twitch":{"enabled":false,"icon":"twitch","key":"","secret":"","callback":"api/auth/twitch/callback","scope":["user:read:email"]},"linkedin":{"enabled":false,"icon":"linkedin","key":"","secret":"","callback":"api/auth/linkedin/callback","scope":["r_liteprofile","r_emailaddress"]},"cognito":{"enabled":false,"icon":"aws","key":"","secret":"","subdomain":"my.subdomain.com","callback":"api/auth/cognito/callback","scope":["email","openid","profile"]},"reddit":{"enabled":false,"icon":"reddit","key":"","secret":"","state":true,"callback":"api/auth/reddit/callback","scope":["identity"]},"auth0":{"enabled":false,"icon":"","key":"","secret":"","subdomain":"my-tenant.eu","callback":"api/auth/auth0/callback","scope":["openid","email","profile"]},"cas":{"enabled":false,"icon":"book","key":"","secret":"","callback":"api/auth/cas/callback","scope":["openid email"],"subdomain":"my.subdomain.com/cas"}}	object	\N	\N
15	plugin_users-permissions_email	{"reset_password":{"display":"Email.template.reset_password","icon":"sync","options":{"from":{"name":"Administration Panel","email":"no-reply@strapi.io"},"response_email":"","object":"Reset password","message":"<p>We heard that you lost your password. Sorry about that!</p>\\n\\n<p>But don’t worry! You can use the following link to reset your password:</p>\\n<p><%= URL %>?code=<%= TOKEN %></p>\\n\\n<p>Thanks.</p>"}},"email_confirmation":{"display":"Email.template.email_confirmation","icon":"check-square","options":{"from":{"name":"Administration Panel","email":"no-reply@strapi.io"},"response_email":"","object":"Account confirmation","message":"<p>Thank you for registering!</p>\\n\\n<p>You have to confirm your email address. Please click on the link below.</p>\\n\\n<p><%= URL %>?confirmation=<%= CODE %></p>\\n\\n<p>Thanks.</p>"}}}	object	\N	\N
16	plugin_users-permissions_advanced	{"unique_email":true,"allow_register":true,"email_confirmation":false,"email_reset_password":null,"email_confirmation_redirection":null,"default_role":"authenticated"}	object	\N	\N
10	plugin_content_manager_configuration_content_types::plugin::users-permissions.user	{"uid":"plugin::users-permissions.user","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"username","defaultSortBy":"username","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"username":{"edit":{"label":"username","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"username","searchable":true,"sortable":true}},"email":{"edit":{"label":"email","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"email","searchable":true,"sortable":true}},"provider":{"edit":{"label":"provider","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"provider","searchable":true,"sortable":true}},"password":{"edit":{"label":"password","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"password","searchable":true,"sortable":true}},"resetPasswordToken":{"edit":{"label":"resetPasswordToken","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"resetPasswordToken","searchable":true,"sortable":true}},"confirmationToken":{"edit":{"label":"confirmationToken","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"confirmationToken","searchable":true,"sortable":true}},"confirmed":{"edit":{"label":"confirmed","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"confirmed","searchable":true,"sortable":true}},"blocked":{"edit":{"label":"blocked","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"blocked","searchable":true,"sortable":true}},"role":{"edit":{"label":"role","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"role","searchable":true,"sortable":true}},"picture":{"edit":{"label":"picture","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"picture","searchable":false,"sortable":false}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"posts":{"edit":{"label":"posts","description":"","placeholder":"","visible":true,"editable":true,"mainField":"title"},"list":{"label":"posts","searchable":false,"sortable":false}},"reactions":{"edit":{"label":"reactions","description":"","placeholder":"","visible":true,"editable":true,"mainField":"type"},"list":{"label":"reactions","searchable":false,"sortable":false}},"comments":{"edit":{"label":"comments","description":"","placeholder":"","visible":true,"editable":true,"mainField":"id"},"list":{"label":"comments","searchable":false,"sortable":false}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}}},"layouts":{"list":["id","username","email","confirmed"],"edit":[[{"name":"username","size":6},{"name":"email","size":6}],[{"name":"password","size":6},{"name":"confirmed","size":4}],[{"name":"blocked","size":4},{"name":"picture","size":6}],[{"name":"name","size":6}]],"editRelations":["role","posts","reactions","comments"]}}	object	\N	\N
17	core_admin_auth	{"providers":{"autoRegister":false,"defaultRole":null}}	object	\N	\N
19	plugin_content_manager_configuration_content_types::api::post.post	{"uid":"api::post.post","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"title","defaultSortBy":"title","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"title":{"edit":{"label":"title","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"title","searchable":true,"sortable":true}},"description":{"edit":{"label":"description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"description","searchable":true,"sortable":true}},"content":{"edit":{"label":"content","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"content","searchable":false,"sortable":false}},"categories":{"edit":{"label":"categories","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"categories","searchable":false,"sortable":false}},"user":{"edit":{"label":"user","description":"","placeholder":"","visible":true,"editable":true,"mainField":"username"},"list":{"label":"user","searchable":true,"sortable":true}},"tags":{"edit":{"label":"tags","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"tags","searchable":false,"sortable":false}},"slug":{"edit":{"label":"slug","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"slug","searchable":true,"sortable":true}},"reactions":{"edit":{"label":"reactions","description":"","placeholder":"","visible":true,"editable":true,"mainField":"type"},"list":{"label":"reactions","searchable":false,"sortable":false}},"comments":{"edit":{"label":"comments","description":"","placeholder":"","visible":true,"editable":true,"mainField":"id"},"list":{"label":"comments","searchable":false,"sortable":false}},"is_pinned":{"edit":{"label":"is_pinned","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"is_pinned","searchable":true,"sortable":true}},"is_blocked":{"edit":{"label":"is_blocked","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"is_blocked","searchable":true,"sortable":true}},"is_trending":{"edit":{"label":"is_trending","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"is_trending","searchable":true,"sortable":true}},"is_locked":{"edit":{"label":"is_locked","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"is_locked","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}}},"layouts":{"list":["id","title","description","categories"],"edit":[[{"name":"title","size":6}],[{"name":"slug","size":6}],[{"name":"description","size":6}],[{"name":"content","size":12}],[{"name":"is_pinned","size":4},{"name":"is_blocked","size":4},{"name":"is_trending","size":4}],[{"name":"is_locked","size":4}]],"editRelations":["categories","user","tags","reactions","comments"]}}	object	\N	\N
18	plugin_content_manager_configuration_content_types::api::category.category	{"uid":"api::category.category","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"slug":{"edit":{"label":"slug","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"slug","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"description":{"edit":{"label":"description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"description","searchable":true,"sortable":true}},"color":{"edit":{"label":"color","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"color","searchable":true,"sortable":true}},"posts":{"edit":{"label":"posts","description":"","placeholder":"","visible":true,"editable":true,"mainField":"title"},"list":{"label":"posts","searchable":false,"sortable":false}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}}},"layouts":{"edit":[[{"name":"name","size":6},{"name":"slug","size":6}],[{"name":"description","size":6},{"name":"color","size":6}]],"editRelations":["posts"],"list":["id","slug","name","description"]}}	object	\N	\N
21	plugin_content_manager_configuration_content_types::api::reaction.reaction	{"uid":"api::reaction.reaction","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"id","defaultSortBy":"type","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"user":{"edit":{"label":"user","description":"","placeholder":"","visible":true,"editable":true,"mainField":"username"},"list":{"label":"user","searchable":true,"sortable":true}},"post":{"edit":{"label":"post","description":"","placeholder":"","visible":true,"editable":true,"mainField":"title"},"list":{"label":"post","searchable":true,"sortable":true}},"type":{"edit":{"label":"type","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"type","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}}},"layouts":{"edit":[[{"name":"type","size":6}]],"editRelations":["user","post"],"list":["id","user","post","type"]}}	object	\N	\N
20	plugin_content_manager_configuration_content_types::api::tag.tag	{"uid":"api::tag.tag","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"posts":{"edit":{"label":"posts","description":"","placeholder":"","visible":true,"editable":true,"mainField":"title"},"list":{"label":"posts","searchable":false,"sortable":false}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","createdAt","updatedAt"],"edit":[[{"name":"name","size":6}]],"editRelations":["posts"]}}	object	\N	\N
22	plugin_content_manager_configuration_content_types::api::comment.comment	{"uid":"api::comment.comment","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"id","defaultSortBy":"id","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"user":{"edit":{"label":"user","description":"","placeholder":"","visible":true,"editable":true,"mainField":"username"},"list":{"label":"user","searchable":true,"sortable":true}},"content":{"edit":{"label":"content","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"content","searchable":false,"sortable":false}},"is_blocked":{"edit":{"label":"is_blocked","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"is_blocked","searchable":true,"sortable":true}},"post":{"edit":{"label":"post","description":"","placeholder":"","visible":true,"editable":true,"mainField":"title"},"list":{"label":"post","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}}},"layouts":{"edit":[[{"name":"content","size":12}],[{"name":"is_blocked","size":4}]],"editRelations":["user","post"],"list":["id","user","is_blocked","post","createdAt"]}}	object	\N	\N
\.


--
-- Data for Name: strapi_database_schema; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.strapi_database_schema (id, schema, "time", hash) FROM stdin;
12	{"tables":[{"name":"strapi_core_store_settings","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"key","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"value","type":"text","args":["longtext"],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"environment","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"tag","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"strapi_webhooks","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"url","type":"text","args":["longtext"],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"headers","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"events","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"enabled","type":"boolean","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"admin_permissions","indexes":[{"name":"admin_permissions_created_by_id_fk","columns":["created_by_id"]},{"name":"admin_permissions_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"admin_permissions_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"admin_permissions_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"action","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"subject","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"properties","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"conditions","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"admin_users","indexes":[{"name":"admin_users_created_by_id_fk","columns":["created_by_id"]},{"name":"admin_users_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"admin_users_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"admin_users_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"firstname","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"lastname","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"username","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"email","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"password","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"reset_password_token","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"registration_token","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"is_active","type":"boolean","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"blocked","type":"boolean","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"prefered_language","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"admin_roles","indexes":[{"name":"admin_roles_created_by_id_fk","columns":["created_by_id"]},{"name":"admin_roles_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"admin_roles_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"admin_roles_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"code","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"description","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"strapi_api_tokens","indexes":[{"name":"strapi_api_tokens_created_by_id_fk","columns":["created_by_id"]},{"name":"strapi_api_tokens_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"strapi_api_tokens_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"strapi_api_tokens_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"description","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"access_key","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"files","indexes":[{"name":"files_created_by_id_fk","columns":["created_by_id"]},{"name":"files_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"files_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"files_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"alternative_text","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"caption","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"width","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"height","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"formats","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"hash","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"ext","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"mime","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"size","type":"decimal","args":[10,2],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"url","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"preview_url","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"provider","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"provider_metadata","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"i18n_locale","indexes":[{"name":"i18n_locale_created_by_id_fk","columns":["created_by_id"]},{"name":"i18n_locale_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"i18n_locale_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"i18n_locale_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"code","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"up_permissions","indexes":[{"name":"up_permissions_created_by_id_fk","columns":["created_by_id"]},{"name":"up_permissions_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"up_permissions_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"up_permissions_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"action","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"up_roles","indexes":[{"name":"up_roles_created_by_id_fk","columns":["created_by_id"]},{"name":"up_roles_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"up_roles_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"up_roles_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"description","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"up_users","indexes":[{"name":"up_users_created_by_id_fk","columns":["created_by_id"]},{"name":"up_users_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"up_users_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"up_users_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"username","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"email","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"provider","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"password","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"reset_password_token","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"confirmation_token","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"confirmed","type":"boolean","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"blocked","type":"boolean","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"categories","indexes":[{"type":"unique","name":"categories_slug_unique","columns":["slug"]},{"name":"categories_created_by_id_fk","columns":["created_by_id"]},{"name":"categories_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"categories_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"categories_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"slug","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false,"unique":true},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"description","type":"text","args":["longtext"],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"color","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"comments","indexes":[{"name":"comments_created_by_id_fk","columns":["created_by_id"]},{"name":"comments_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"comments_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"comments_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"content","type":"text","args":["longtext"],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"is_blocked","type":"boolean","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"posts","indexes":[{"type":"unique","name":"posts_slug_unique","columns":["slug"]},{"name":"posts_created_by_id_fk","columns":["created_by_id"]},{"name":"posts_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"posts_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"posts_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"title","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"description","type":"text","args":["longtext"],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"content","type":"text","args":["longtext"],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"slug","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false,"unique":true},{"name":"is_pinned","type":"boolean","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"is_blocked","type":"boolean","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"is_trending","type":"boolean","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"is_locked","type":"boolean","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"reactions","indexes":[{"name":"reactions_created_by_id_fk","columns":["created_by_id"]},{"name":"reactions_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"reactions_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"reactions_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"tags","indexes":[{"name":"tags_created_by_id_fk","columns":["created_by_id"]},{"name":"tags_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"tags_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"tags_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"admin_permissions_role_links","indexes":[{"name":"admin_permissions_role_links_fk","columns":["permission_id"]},{"name":"admin_permissions_role_links_inv_fk","columns":["role_id"]}],"foreignKeys":[{"name":"admin_permissions_role_links_fk","columns":["permission_id"],"referencedColumns":["id"],"referencedTable":"admin_permissions","onDelete":"CASCADE"},{"name":"admin_permissions_role_links_inv_fk","columns":["role_id"],"referencedColumns":["id"],"referencedTable":"admin_roles","onDelete":"CASCADE"}],"columns":[{"name":"permission_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"role_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"admin_users_roles_links","indexes":[{"name":"admin_users_roles_links_fk","columns":["user_id"]},{"name":"admin_users_roles_links_inv_fk","columns":["role_id"]}],"foreignKeys":[{"name":"admin_users_roles_links_fk","columns":["user_id"],"referencedColumns":["id"],"referencedTable":"admin_users","onDelete":"CASCADE"},{"name":"admin_users_roles_links_inv_fk","columns":["role_id"],"referencedColumns":["id"],"referencedTable":"admin_roles","onDelete":"CASCADE"}],"columns":[{"name":"user_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"role_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"files_related_morphs","indexes":[{"name":"files_related_morphs_fk","columns":["file_id"]}],"foreignKeys":[{"name":"files_related_morphs_fk","columns":["file_id"],"referencedColumns":["id"],"referencedTable":"files","onDelete":"CASCADE"}],"columns":[{"name":"file_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"related_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"related_type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"field","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"order","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"up_permissions_role_links","indexes":[{"name":"up_permissions_role_links_fk","columns":["permission_id"]},{"name":"up_permissions_role_links_inv_fk","columns":["role_id"]}],"foreignKeys":[{"name":"up_permissions_role_links_fk","columns":["permission_id"],"referencedColumns":["id"],"referencedTable":"up_permissions","onDelete":"CASCADE"},{"name":"up_permissions_role_links_inv_fk","columns":["role_id"],"referencedColumns":["id"],"referencedTable":"up_roles","onDelete":"CASCADE"}],"columns":[{"name":"permission_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"role_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"up_users_role_links","indexes":[{"name":"up_users_role_links_fk","columns":["user_id"]},{"name":"up_users_role_links_inv_fk","columns":["role_id"]}],"foreignKeys":[{"name":"up_users_role_links_fk","columns":["user_id"],"referencedColumns":["id"],"referencedTable":"up_users","onDelete":"CASCADE"},{"name":"up_users_role_links_inv_fk","columns":["role_id"],"referencedColumns":["id"],"referencedTable":"up_roles","onDelete":"CASCADE"}],"columns":[{"name":"user_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"role_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"comments_user_links","indexes":[{"name":"comments_user_links_fk","columns":["comment_id"]},{"name":"comments_user_links_inv_fk","columns":["user_id"]}],"foreignKeys":[{"name":"comments_user_links_fk","columns":["comment_id"],"referencedColumns":["id"],"referencedTable":"comments","onDelete":"CASCADE"},{"name":"comments_user_links_inv_fk","columns":["user_id"],"referencedColumns":["id"],"referencedTable":"up_users","onDelete":"CASCADE"}],"columns":[{"name":"comment_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"user_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"comments_post_links","indexes":[{"name":"comments_post_links_fk","columns":["comment_id"]},{"name":"comments_post_links_inv_fk","columns":["post_id"]}],"foreignKeys":[{"name":"comments_post_links_fk","columns":["comment_id"],"referencedColumns":["id"],"referencedTable":"comments","onDelete":"CASCADE"},{"name":"comments_post_links_inv_fk","columns":["post_id"],"referencedColumns":["id"],"referencedTable":"posts","onDelete":"CASCADE"}],"columns":[{"name":"comment_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"post_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"posts_categories_links","indexes":[{"name":"posts_categories_links_fk","columns":["post_id"]},{"name":"posts_categories_links_inv_fk","columns":["category_id"]}],"foreignKeys":[{"name":"posts_categories_links_fk","columns":["post_id"],"referencedColumns":["id"],"referencedTable":"posts","onDelete":"CASCADE"},{"name":"posts_categories_links_inv_fk","columns":["category_id"],"referencedColumns":["id"],"referencedTable":"categories","onDelete":"CASCADE"}],"columns":[{"name":"post_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"category_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"posts_user_links","indexes":[{"name":"posts_user_links_fk","columns":["post_id"]},{"name":"posts_user_links_inv_fk","columns":["user_id"]}],"foreignKeys":[{"name":"posts_user_links_fk","columns":["post_id"],"referencedColumns":["id"],"referencedTable":"posts","onDelete":"CASCADE"},{"name":"posts_user_links_inv_fk","columns":["user_id"],"referencedColumns":["id"],"referencedTable":"up_users","onDelete":"CASCADE"}],"columns":[{"name":"post_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"user_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"posts_tags_links","indexes":[{"name":"posts_tags_links_fk","columns":["post_id"]},{"name":"posts_tags_links_inv_fk","columns":["tag_id"]}],"foreignKeys":[{"name":"posts_tags_links_fk","columns":["post_id"],"referencedColumns":["id"],"referencedTable":"posts","onDelete":"CASCADE"},{"name":"posts_tags_links_inv_fk","columns":["tag_id"],"referencedColumns":["id"],"referencedTable":"tags","onDelete":"CASCADE"}],"columns":[{"name":"post_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"tag_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"reactions_user_links","indexes":[{"name":"reactions_user_links_fk","columns":["reaction_id"]},{"name":"reactions_user_links_inv_fk","columns":["user_id"]}],"foreignKeys":[{"name":"reactions_user_links_fk","columns":["reaction_id"],"referencedColumns":["id"],"referencedTable":"reactions","onDelete":"CASCADE"},{"name":"reactions_user_links_inv_fk","columns":["user_id"],"referencedColumns":["id"],"referencedTable":"up_users","onDelete":"CASCADE"}],"columns":[{"name":"reaction_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"user_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"reactions_post_links","indexes":[{"name":"reactions_post_links_fk","columns":["reaction_id"]},{"name":"reactions_post_links_inv_fk","columns":["post_id"]}],"foreignKeys":[{"name":"reactions_post_links_fk","columns":["reaction_id"],"referencedColumns":["id"],"referencedTable":"reactions","onDelete":"CASCADE"},{"name":"reactions_post_links_inv_fk","columns":["post_id"],"referencedColumns":["id"],"referencedTable":"posts","onDelete":"CASCADE"}],"columns":[{"name":"reaction_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"post_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]}]}	2022-07-26 15:02:02.408	8c81d8243e7c30779cbdaa0e6f104d70
\.


--
-- Data for Name: strapi_migrations; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.strapi_migrations (id, name, "time") FROM stdin;
\.


--
-- Data for Name: strapi_webhooks; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.strapi_webhooks (id, name, url, headers, events, enabled) FROM stdin;
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.tags (id, name, created_at, updated_at, created_by_id, updated_by_id) FROM stdin;
2	java	2022-07-26 11:17:04.57	2022-07-26 11:17:04.57	1	1
3	design pattern	2022-07-26 11:17:14.561	2022-07-26 11:17:14.561	1	1
\.


--
-- Data for Name: up_permissions; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.up_permissions (id, action, created_at, updated_at, created_by_id, updated_by_id) FROM stdin;
1	plugin::users-permissions.auth.connect	2022-07-26 11:03:29.325	2022-07-26 11:03:29.325	\N	\N
2	plugin::users-permissions.user.me	2022-07-26 11:03:29.325	2022-07-26 11:03:29.325	\N	\N
5	plugin::users-permissions.auth.callback	2022-07-26 11:03:29.333	2022-07-26 11:03:29.333	\N	\N
6	plugin::users-permissions.auth.connect	2022-07-26 11:03:29.333	2022-07-26 11:03:29.333	\N	\N
9	plugin::users-permissions.auth.register	2022-07-26 11:03:29.333	2022-07-26 11:03:29.333	\N	\N
11	plugin::users-permissions.user.me	2022-07-26 11:03:29.333	2022-07-26 11:03:29.333	\N	\N
\.


--
-- Data for Name: up_permissions_role_links; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.up_permissions_role_links (permission_id, role_id) FROM stdin;
1	1
2	1
5	2
6	2
9	2
11	2
\.


--
-- Data for Name: up_roles; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.up_roles (id, name, description, type, created_at, updated_at, created_by_id, updated_by_id) FROM stdin;
1	Authenticated	Default role given to authenticated user.	authenticated	2022-07-26 11:03:29.312	2022-07-26 11:03:29.312	\N	\N
2	Public	Default role given to unauthenticated user.	public	2022-07-26 11:03:29.316	2022-07-26 11:03:29.316	\N	\N
\.


--
-- Data for Name: up_users; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.up_users (id, username, email, provider, password, reset_password_token, confirmation_token, confirmed, blocked, name, created_at, updated_at, created_by_id, updated_by_id) FROM stdin;
1	tan.pham	tanpn@gmail.com	local	$2a$10$j.JmvSmwIMZkA4bKZDxrrONQ4/CU/7NbcQO5OQMAZjRCIb7M//MCm	\N	\N	t	f	Tan Pham	2022-07-26 11:18:26.272	2022-07-26 11:18:26.272	1	1
\.


--
-- Data for Name: up_users_role_links; Type: TABLE DATA; Schema: public; Owner: f4admin
--

COPY public.up_users_role_links (user_id, role_id) FROM stdin;
1	1
\.


--
-- Name: admin_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: f4admin
--

SELECT pg_catalog.setval('public.admin_permissions_id_seq', 122, true);


--
-- Name: admin_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: f4admin
--

SELECT pg_catalog.setval('public.admin_roles_id_seq', 3, true);


--
-- Name: admin_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: f4admin
--

SELECT pg_catalog.setval('public.admin_users_id_seq', 1, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: f4admin
--

SELECT pg_catalog.setval('public.categories_id_seq', 1, true);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: f4admin
--

SELECT pg_catalog.setval('public.comments_id_seq', 2, true);


--
-- Name: files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: f4admin
--

SELECT pg_catalog.setval('public.files_id_seq', 1, false);


--
-- Name: i18n_locale_id_seq; Type: SEQUENCE SET; Schema: public; Owner: f4admin
--

SELECT pg_catalog.setval('public.i18n_locale_id_seq', 1, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: f4admin
--

SELECT pg_catalog.setval('public.posts_id_seq', 3, true);


--
-- Name: reactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: f4admin
--

SELECT pg_catalog.setval('public.reactions_id_seq', 4, true);


--
-- Name: strapi_api_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: f4admin
--

SELECT pg_catalog.setval('public.strapi_api_tokens_id_seq', 2, true);


--
-- Name: strapi_core_store_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: f4admin
--

SELECT pg_catalog.setval('public.strapi_core_store_settings_id_seq', 22, true);


--
-- Name: strapi_database_schema_id_seq; Type: SEQUENCE SET; Schema: public; Owner: f4admin
--

SELECT pg_catalog.setval('public.strapi_database_schema_id_seq', 12, true);


--
-- Name: strapi_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: f4admin
--

SELECT pg_catalog.setval('public.strapi_migrations_id_seq', 1, false);


--
-- Name: strapi_webhooks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: f4admin
--

SELECT pg_catalog.setval('public.strapi_webhooks_id_seq', 1, false);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: f4admin
--

SELECT pg_catalog.setval('public.tags_id_seq', 3, true);


--
-- Name: up_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: f4admin
--

SELECT pg_catalog.setval('public.up_permissions_id_seq', 11, true);


--
-- Name: up_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: f4admin
--

SELECT pg_catalog.setval('public.up_roles_id_seq', 2, true);


--
-- Name: up_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: f4admin
--

SELECT pg_catalog.setval('public.up_users_id_seq', 1, true);


--
-- Name: admin_permissions admin_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.admin_permissions
    ADD CONSTRAINT admin_permissions_pkey PRIMARY KEY (id);


--
-- Name: admin_roles admin_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.admin_roles
    ADD CONSTRAINT admin_roles_pkey PRIMARY KEY (id);


--
-- Name: admin_users admin_users_pkey; Type: CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: categories categories_slug_unique; Type: CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_slug_unique UNIQUE (slug);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: files files_pkey; Type: CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);


--
-- Name: i18n_locale i18n_locale_pkey; Type: CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.i18n_locale
    ADD CONSTRAINT i18n_locale_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: posts posts_slug_unique; Type: CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_slug_unique UNIQUE (slug);


--
-- Name: reactions reactions_pkey; Type: CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.reactions
    ADD CONSTRAINT reactions_pkey PRIMARY KEY (id);


--
-- Name: strapi_api_tokens strapi_api_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.strapi_api_tokens
    ADD CONSTRAINT strapi_api_tokens_pkey PRIMARY KEY (id);


--
-- Name: strapi_core_store_settings strapi_core_store_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.strapi_core_store_settings
    ADD CONSTRAINT strapi_core_store_settings_pkey PRIMARY KEY (id);


--
-- Name: strapi_database_schema strapi_database_schema_pkey; Type: CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.strapi_database_schema
    ADD CONSTRAINT strapi_database_schema_pkey PRIMARY KEY (id);


--
-- Name: strapi_migrations strapi_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.strapi_migrations
    ADD CONSTRAINT strapi_migrations_pkey PRIMARY KEY (id);


--
-- Name: strapi_webhooks strapi_webhooks_pkey; Type: CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.strapi_webhooks
    ADD CONSTRAINT strapi_webhooks_pkey PRIMARY KEY (id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: up_permissions up_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.up_permissions
    ADD CONSTRAINT up_permissions_pkey PRIMARY KEY (id);


--
-- Name: up_roles up_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.up_roles
    ADD CONSTRAINT up_roles_pkey PRIMARY KEY (id);


--
-- Name: up_users up_users_pkey; Type: CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.up_users
    ADD CONSTRAINT up_users_pkey PRIMARY KEY (id);


--
-- Name: admin_permissions_created_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX admin_permissions_created_by_id_fk ON public.admin_permissions USING btree (created_by_id);


--
-- Name: admin_permissions_role_links_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX admin_permissions_role_links_fk ON public.admin_permissions_role_links USING btree (permission_id);


--
-- Name: admin_permissions_role_links_inv_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX admin_permissions_role_links_inv_fk ON public.admin_permissions_role_links USING btree (role_id);


--
-- Name: admin_permissions_updated_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX admin_permissions_updated_by_id_fk ON public.admin_permissions USING btree (updated_by_id);


--
-- Name: admin_roles_created_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX admin_roles_created_by_id_fk ON public.admin_roles USING btree (created_by_id);


--
-- Name: admin_roles_updated_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX admin_roles_updated_by_id_fk ON public.admin_roles USING btree (updated_by_id);


--
-- Name: admin_users_created_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX admin_users_created_by_id_fk ON public.admin_users USING btree (created_by_id);


--
-- Name: admin_users_roles_links_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX admin_users_roles_links_fk ON public.admin_users_roles_links USING btree (user_id);


--
-- Name: admin_users_roles_links_inv_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX admin_users_roles_links_inv_fk ON public.admin_users_roles_links USING btree (role_id);


--
-- Name: admin_users_updated_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX admin_users_updated_by_id_fk ON public.admin_users USING btree (updated_by_id);


--
-- Name: categories_created_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX categories_created_by_id_fk ON public.categories USING btree (created_by_id);


--
-- Name: categories_updated_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX categories_updated_by_id_fk ON public.categories USING btree (updated_by_id);


--
-- Name: comments_created_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX comments_created_by_id_fk ON public.comments USING btree (created_by_id);


--
-- Name: comments_post_links_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX comments_post_links_fk ON public.comments_post_links USING btree (comment_id);


--
-- Name: comments_post_links_inv_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX comments_post_links_inv_fk ON public.comments_post_links USING btree (post_id);


--
-- Name: comments_updated_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX comments_updated_by_id_fk ON public.comments USING btree (updated_by_id);


--
-- Name: comments_user_links_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX comments_user_links_fk ON public.comments_user_links USING btree (comment_id);


--
-- Name: comments_user_links_inv_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX comments_user_links_inv_fk ON public.comments_user_links USING btree (user_id);


--
-- Name: files_created_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX files_created_by_id_fk ON public.files USING btree (created_by_id);


--
-- Name: files_related_morphs_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX files_related_morphs_fk ON public.files_related_morphs USING btree (file_id);


--
-- Name: files_updated_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX files_updated_by_id_fk ON public.files USING btree (updated_by_id);


--
-- Name: i18n_locale_created_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX i18n_locale_created_by_id_fk ON public.i18n_locale USING btree (created_by_id);


--
-- Name: i18n_locale_updated_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX i18n_locale_updated_by_id_fk ON public.i18n_locale USING btree (updated_by_id);


--
-- Name: posts_categories_links_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX posts_categories_links_fk ON public.posts_categories_links USING btree (post_id);


--
-- Name: posts_categories_links_inv_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX posts_categories_links_inv_fk ON public.posts_categories_links USING btree (category_id);


--
-- Name: posts_created_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX posts_created_by_id_fk ON public.posts USING btree (created_by_id);


--
-- Name: posts_tags_links_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX posts_tags_links_fk ON public.posts_tags_links USING btree (post_id);


--
-- Name: posts_tags_links_inv_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX posts_tags_links_inv_fk ON public.posts_tags_links USING btree (tag_id);


--
-- Name: posts_updated_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX posts_updated_by_id_fk ON public.posts USING btree (updated_by_id);


--
-- Name: posts_user_links_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX posts_user_links_fk ON public.posts_user_links USING btree (post_id);


--
-- Name: posts_user_links_inv_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX posts_user_links_inv_fk ON public.posts_user_links USING btree (user_id);


--
-- Name: reactions_created_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX reactions_created_by_id_fk ON public.reactions USING btree (created_by_id);


--
-- Name: reactions_post_links_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX reactions_post_links_fk ON public.reactions_post_links USING btree (reaction_id);


--
-- Name: reactions_post_links_inv_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX reactions_post_links_inv_fk ON public.reactions_post_links USING btree (post_id);


--
-- Name: reactions_updated_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX reactions_updated_by_id_fk ON public.reactions USING btree (updated_by_id);


--
-- Name: reactions_user_links_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX reactions_user_links_fk ON public.reactions_user_links USING btree (reaction_id);


--
-- Name: reactions_user_links_inv_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX reactions_user_links_inv_fk ON public.reactions_user_links USING btree (user_id);


--
-- Name: strapi_api_tokens_created_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX strapi_api_tokens_created_by_id_fk ON public.strapi_api_tokens USING btree (created_by_id);


--
-- Name: strapi_api_tokens_updated_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX strapi_api_tokens_updated_by_id_fk ON public.strapi_api_tokens USING btree (updated_by_id);


--
-- Name: tags_created_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX tags_created_by_id_fk ON public.tags USING btree (created_by_id);


--
-- Name: tags_updated_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX tags_updated_by_id_fk ON public.tags USING btree (updated_by_id);


--
-- Name: up_permissions_created_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX up_permissions_created_by_id_fk ON public.up_permissions USING btree (created_by_id);


--
-- Name: up_permissions_role_links_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX up_permissions_role_links_fk ON public.up_permissions_role_links USING btree (permission_id);


--
-- Name: up_permissions_role_links_inv_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX up_permissions_role_links_inv_fk ON public.up_permissions_role_links USING btree (role_id);


--
-- Name: up_permissions_updated_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX up_permissions_updated_by_id_fk ON public.up_permissions USING btree (updated_by_id);


--
-- Name: up_roles_created_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX up_roles_created_by_id_fk ON public.up_roles USING btree (created_by_id);


--
-- Name: up_roles_updated_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX up_roles_updated_by_id_fk ON public.up_roles USING btree (updated_by_id);


--
-- Name: up_users_created_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX up_users_created_by_id_fk ON public.up_users USING btree (created_by_id);


--
-- Name: up_users_role_links_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX up_users_role_links_fk ON public.up_users_role_links USING btree (user_id);


--
-- Name: up_users_role_links_inv_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX up_users_role_links_inv_fk ON public.up_users_role_links USING btree (role_id);


--
-- Name: up_users_updated_by_id_fk; Type: INDEX; Schema: public; Owner: f4admin
--

CREATE INDEX up_users_updated_by_id_fk ON public.up_users USING btree (updated_by_id);


--
-- Name: admin_permissions admin_permissions_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.admin_permissions
    ADD CONSTRAINT admin_permissions_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: admin_permissions_role_links admin_permissions_role_links_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.admin_permissions_role_links
    ADD CONSTRAINT admin_permissions_role_links_fk FOREIGN KEY (permission_id) REFERENCES public.admin_permissions(id) ON DELETE CASCADE;


--
-- Name: admin_permissions_role_links admin_permissions_role_links_inv_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.admin_permissions_role_links
    ADD CONSTRAINT admin_permissions_role_links_inv_fk FOREIGN KEY (role_id) REFERENCES public.admin_roles(id) ON DELETE CASCADE;


--
-- Name: admin_permissions admin_permissions_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.admin_permissions
    ADD CONSTRAINT admin_permissions_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: admin_roles admin_roles_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.admin_roles
    ADD CONSTRAINT admin_roles_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: admin_roles admin_roles_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.admin_roles
    ADD CONSTRAINT admin_roles_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: admin_users admin_users_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: admin_users_roles_links admin_users_roles_links_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.admin_users_roles_links
    ADD CONSTRAINT admin_users_roles_links_fk FOREIGN KEY (user_id) REFERENCES public.admin_users(id) ON DELETE CASCADE;


--
-- Name: admin_users_roles_links admin_users_roles_links_inv_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.admin_users_roles_links
    ADD CONSTRAINT admin_users_roles_links_inv_fk FOREIGN KEY (role_id) REFERENCES public.admin_roles(id) ON DELETE CASCADE;


--
-- Name: admin_users admin_users_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: categories categories_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: categories categories_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: comments comments_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: comments_post_links comments_post_links_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.comments_post_links
    ADD CONSTRAINT comments_post_links_fk FOREIGN KEY (comment_id) REFERENCES public.comments(id) ON DELETE CASCADE;


--
-- Name: comments_post_links comments_post_links_inv_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.comments_post_links
    ADD CONSTRAINT comments_post_links_inv_fk FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: comments comments_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: comments_user_links comments_user_links_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.comments_user_links
    ADD CONSTRAINT comments_user_links_fk FOREIGN KEY (comment_id) REFERENCES public.comments(id) ON DELETE CASCADE;


--
-- Name: comments_user_links comments_user_links_inv_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.comments_user_links
    ADD CONSTRAINT comments_user_links_inv_fk FOREIGN KEY (user_id) REFERENCES public.up_users(id) ON DELETE CASCADE;


--
-- Name: files files_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: files_related_morphs files_related_morphs_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.files_related_morphs
    ADD CONSTRAINT files_related_morphs_fk FOREIGN KEY (file_id) REFERENCES public.files(id) ON DELETE CASCADE;


--
-- Name: files files_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: i18n_locale i18n_locale_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.i18n_locale
    ADD CONSTRAINT i18n_locale_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: i18n_locale i18n_locale_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.i18n_locale
    ADD CONSTRAINT i18n_locale_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: posts_categories_links posts_categories_links_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.posts_categories_links
    ADD CONSTRAINT posts_categories_links_fk FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: posts_categories_links posts_categories_links_inv_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.posts_categories_links
    ADD CONSTRAINT posts_categories_links_inv_fk FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- Name: posts posts_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: posts_tags_links posts_tags_links_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.posts_tags_links
    ADD CONSTRAINT posts_tags_links_fk FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: posts_tags_links posts_tags_links_inv_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.posts_tags_links
    ADD CONSTRAINT posts_tags_links_inv_fk FOREIGN KEY (tag_id) REFERENCES public.tags(id) ON DELETE CASCADE;


--
-- Name: posts posts_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: posts_user_links posts_user_links_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.posts_user_links
    ADD CONSTRAINT posts_user_links_fk FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: posts_user_links posts_user_links_inv_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.posts_user_links
    ADD CONSTRAINT posts_user_links_inv_fk FOREIGN KEY (user_id) REFERENCES public.up_users(id) ON DELETE CASCADE;


--
-- Name: reactions reactions_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.reactions
    ADD CONSTRAINT reactions_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: reactions_post_links reactions_post_links_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.reactions_post_links
    ADD CONSTRAINT reactions_post_links_fk FOREIGN KEY (reaction_id) REFERENCES public.reactions(id) ON DELETE CASCADE;


--
-- Name: reactions_post_links reactions_post_links_inv_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.reactions_post_links
    ADD CONSTRAINT reactions_post_links_inv_fk FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: reactions reactions_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.reactions
    ADD CONSTRAINT reactions_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: reactions_user_links reactions_user_links_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.reactions_user_links
    ADD CONSTRAINT reactions_user_links_fk FOREIGN KEY (reaction_id) REFERENCES public.reactions(id) ON DELETE CASCADE;


--
-- Name: reactions_user_links reactions_user_links_inv_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.reactions_user_links
    ADD CONSTRAINT reactions_user_links_inv_fk FOREIGN KEY (user_id) REFERENCES public.up_users(id) ON DELETE CASCADE;


--
-- Name: strapi_api_tokens strapi_api_tokens_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.strapi_api_tokens
    ADD CONSTRAINT strapi_api_tokens_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_api_tokens strapi_api_tokens_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.strapi_api_tokens
    ADD CONSTRAINT strapi_api_tokens_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: tags tags_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: tags tags_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: up_permissions up_permissions_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.up_permissions
    ADD CONSTRAINT up_permissions_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: up_permissions_role_links up_permissions_role_links_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.up_permissions_role_links
    ADD CONSTRAINT up_permissions_role_links_fk FOREIGN KEY (permission_id) REFERENCES public.up_permissions(id) ON DELETE CASCADE;


--
-- Name: up_permissions_role_links up_permissions_role_links_inv_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.up_permissions_role_links
    ADD CONSTRAINT up_permissions_role_links_inv_fk FOREIGN KEY (role_id) REFERENCES public.up_roles(id) ON DELETE CASCADE;


--
-- Name: up_permissions up_permissions_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.up_permissions
    ADD CONSTRAINT up_permissions_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: up_roles up_roles_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.up_roles
    ADD CONSTRAINT up_roles_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: up_roles up_roles_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.up_roles
    ADD CONSTRAINT up_roles_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: up_users up_users_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.up_users
    ADD CONSTRAINT up_users_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: up_users_role_links up_users_role_links_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.up_users_role_links
    ADD CONSTRAINT up_users_role_links_fk FOREIGN KEY (user_id) REFERENCES public.up_users(id) ON DELETE CASCADE;


--
-- Name: up_users_role_links up_users_role_links_inv_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.up_users_role_links
    ADD CONSTRAINT up_users_role_links_inv_fk FOREIGN KEY (role_id) REFERENCES public.up_roles(id) ON DELETE CASCADE;


--
-- Name: up_users up_users_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: f4admin
--

ALTER TABLE ONLY public.up_users
    ADD CONSTRAINT up_users_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

