--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2024-08-08 21:01:28

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
-- TOC entry 221 (class 1259 OID 17704)
-- Name: Automobiles; Type: TABLE; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE TABLE public."Automobiles" (
    id integer NOT NULL,
    symboling integer,
    normalized_losses double precision,
    make character varying(255) NOT NULL,
    fuel_type character varying(255) NOT NULL,
    aspiration character varying(255) NOT NULL,
    num_of_doors character varying(255),
    body_style character varying(255) NOT NULL,
    drive_wheels character varying(255) NOT NULL,
    engine_location character varying(255) NOT NULL,
    wheel_base double precision NOT NULL,
    length double precision NOT NULL,
    width double precision NOT NULL,
    height double precision NOT NULL,
    curb_weight integer NOT NULL,
    engine_type character varying(255) NOT NULL,
    num_of_cylinders character varying(255) NOT NULL,
    engine_size integer NOT NULL,
    fuel_system character varying(255) NOT NULL,
    bore double precision,
    stroke double precision,
    compression_ratio double precision NOT NULL,
    horsepower integer,
    peak_rpm integer,
    city_mpg integer NOT NULL,
    highway_mpg integer NOT NULL,
    price double precision,
    year integer,
    car_body character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- TOC entry 220 (class 1259 OID 17703)
-- Dependencies: 221
-- Name: Automobiles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE SEQUENCE public."Automobiles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4823 (class 0 OID 0)
-- Dependencies: 220
-- Name: Automobiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER SEQUENCE public."Automobiles_id_seq" OWNED BY public."Automobiles".id;


--
-- TOC entry 218 (class 1259 OID 17674)
-- Name: SavedSearches; Type: TABLE; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE TABLE public."SavedSearches" (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    "fuelFilter" character varying(255),
    "bodyStyleFilter" character varying(255),
    "minPrice" double precision DEFAULT '0'::double precision NOT NULL,
    "maxPrice" double precision DEFAULT '100000'::double precision NOT NULL,
    "sortOption" character varying(255),
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- TOC entry 217 (class 1259 OID 17673)
-- Dependencies: 218
-- Name: SavedSearches_id_seq; Type: SEQUENCE; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE SEQUENCE public."SavedSearches_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4824 (class 0 OID 0)
-- Dependencies: 217
-- Name: SavedSearches_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER SEQUENCE public."SavedSearches_id_seq" OWNED BY public."SavedSearches".id;


--
-- TOC entry 219 (class 1259 OID 17689)
-- Name: Sessions; Type: TABLE; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE TABLE public."Sessions" (
    sid character varying(36) NOT NULL,
    expires timestamp with time zone,
    data text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- TOC entry 216 (class 1259 OID 17663)
-- Name: Users; Type: TABLE; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255),
    "googleId" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- TOC entry 215 (class 1259 OID 17662)
-- Dependencies: 216
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4825 (class 0 OID 0)
-- Dependencies: 215
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- TOC entry 4652 (class 2604 OID 17707)
-- Dependencies: 220 221 221
-- Name: Automobiles id; Type: DEFAULT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public."Automobiles" ALTER COLUMN id SET DEFAULT nextval('public."Automobiles_id_seq"'::regclass);


--
-- TOC entry 4649 (class 2604 OID 17677)
-- Dependencies: 217 218 218
-- Name: SavedSearches id; Type: DEFAULT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public."SavedSearches" ALTER COLUMN id SET DEFAULT nextval('public."SavedSearches_id_seq"'::regclass);


--
-- TOC entry 4648 (class 2604 OID 17666)
-- Dependencies: 216 215 216
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- TOC entry 4815 (class 0 OID 17704)
-- Dependencies: 221
-- Data for Name: Automobiles; Type: TABLE DATA; Schema: public; Owner: -
-- Data Pos: 10868
--

COPY public."Automobiles" (id, symboling, normalized_losses, make, fuel_type, aspiration, num_of_doors, body_style, drive_wheels, engine_location, wheel_base, length, width, height, curb_weight, engine_type, num_of_cylinders, engine_size, fuel_system, bore, stroke, compression_ratio, horsepower, peak_rpm, city_mpg, highway_mpg, price, year, car_body, "createdAt", "updatedAt") FROM stdin;
1	3	122	alfa-romero	gas	std	two	convertible	rwd	front	88.6	168.8	64.1	48.8	2548	dohc	four	130	mpfi	3.47	2.68	9	111	5000	21	27	13495	2017	Convertible	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
2	3	122	alfa-romero	gas	std	two	convertible	rwd	front	88.6	168.8	64.1	48.8	2548	dohc	four	130	mpfi	3.47	2.68	9	111	5000	21	27	16500	2021	Convertible	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
3	1	122	alfa-romero	gas	std	two	hatchback	rwd	front	94.5	171.2	65.5	52.4	2823	ohcv	six	152	mpfi	2.68	3.47	9	154	5000	19	26	16500	2018	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
4	2	164	audi	gas	std	four	sedan	fwd	front	99.8	176.6	66.2	54.3	2337	ohc	four	109	mpfi	3.19	3.4	10	102	5500	24	30	13950	2018	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
5	2	164	audi	gas	std	four	sedan	4wd	front	99.4	176.6	66.4	54.3	2824	ohc	five	136	mpfi	3.19	3.4	8	115	5500	18	22	17450	2021	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
6	2	122	audi	gas	std	two	sedan	fwd	front	99.8	177.3	66.3	53.1	2507	ohc	five	136	mpfi	3.19	3.4	8.5	110	5500	19	25	15250	2017	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
7	1	158	audi	gas	std	four	sedan	fwd	front	105.8	192.7	71.4	55.7	2844	ohc	five	136	mpfi	3.19	3.4	8.5	110	5500	19	25	17710	2018	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
8	1	122	audi	gas	std	four	wagon	fwd	front	105.8	192.7	71.4	55.7	2954	ohc	five	136	mpfi	3.19	3.4	8.5	110	5500	19	25	18920	2017	Station Wagon	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
9	1	158	audi	gas	turbo	four	sedan	fwd	front	105.8	192.7	71.4	55.9	3086	ohc	five	131	mpfi	3.13	3.4	8.3	140	5500	17	20	23875	2022	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
10	0	122	audi	gas	turbo	two	hatchback	4wd	front	99.5	178.2	67.9	52	3053	ohc	five	131	mpfi	3.13	3.4	7	160	5500	16	22	13207.129353233831	2019	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
11	2	192	bmw	gas	std	two	sedan	rwd	front	101.2	176.8	64.8	54.3	2395	ohc	four	108	mpfi	3.5	2.8	8.8	101	5800	23	29	16430	2019	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
12	0	192	bmw	gas	std	four	sedan	rwd	front	101.2	176.8	64.8	54.3	2395	ohc	four	108	mpfi	3.5	2.8	8.8	101	5800	23	29	16925	2022	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
13	0	188	bmw	gas	std	two	sedan	rwd	front	101.2	176.8	64.8	54.3	2710	ohc	six	164	mpfi	3.31	3.19	9	121	4250	21	28	20970	2022	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
14	0	188	bmw	gas	std	four	sedan	rwd	front	101.2	176.8	64.8	54.3	2765	ohc	six	164	mpfi	3.31	3.19	9	121	4250	21	28	21105	2022	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
15	1	122	bmw	gas	std	four	sedan	rwd	front	103.5	189	66.9	55.7	3055	ohc	six	164	mpfi	3.31	3.19	9	121	4250	20	25	24565	2020	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
16	0	122	bmw	gas	std	four	sedan	rwd	front	103.5	189	66.9	55.7	3230	ohc	six	209	mpfi	3.62	3.39	8	182	5400	16	22	30760	2017	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
17	0	122	bmw	gas	std	two	sedan	rwd	front	103.5	193.8	67.9	53.7	3380	ohc	six	209	mpfi	3.62	3.39	8	182	5400	16	22	41315	2017	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
18	0	122	bmw	gas	std	four	sedan	rwd	front	110	197	70.9	56.3	3505	ohc	six	209	mpfi	3.62	3.39	8	182	5400	15	20	36880	2022	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
19	2	121	chevrolet	gas	std	two	hatchback	fwd	front	88.4	141.1	60.3	53.2	1488	l	three	61	2bbl	2.91	3.03	9.5	48	5100	47	53	5151	2018	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
20	1	98	chevrolet	gas	std	two	hatchback	fwd	front	94.5	155.9	63.6	52	1874	ohc	four	90	2bbl	3.03	3.11	9.6	70	5400	38	43	6295	2017	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
21	0	81	chevrolet	gas	std	four	sedan	fwd	front	94.5	158.8	63.6	52	1909	ohc	four	90	2bbl	3.03	3.11	9.6	70	5400	38	43	6575	2020	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
22	1	118	dodge	gas	std	two	hatchback	fwd	front	93.7	157.3	63.8	50.8	1876	ohc	four	90	2bbl	2.97	3.23	9.41	68	5500	37	41	5572	2020	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
23	1	118	dodge	gas	std	two	hatchback	fwd	front	93.7	157.3	63.8	50.8	1876	ohc	four	90	2bbl	2.97	3.23	9.4	68	5500	31	38	6377	2020	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
24	1	118	dodge	gas	turbo	two	hatchback	fwd	front	93.7	157.3	63.8	50.8	2128	ohc	four	98	mpfi	3.03	3.39	7.6	102	5500	24	30	7957	2020	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
25	1	148	dodge	gas	std	four	hatchback	fwd	front	93.7	157.3	63.8	50.6	1967	ohc	four	90	2bbl	2.97	3.23	9.4	68	5500	31	38	6229	2017	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
26	1	148	dodge	gas	std	four	sedan	fwd	front	93.7	157.3	63.8	50.6	1989	ohc	four	90	2bbl	2.97	3.23	9.4	68	5500	31	38	6692	2020	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
27	1	148	dodge	gas	std	four	sedan	fwd	front	93.7	157.3	63.8	50.6	1989	ohc	four	90	2bbl	2.97	3.23	9.4	68	5500	31	38	7609	2022	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
28	1	148	dodge	gas	turbo	four	sedan	fwd	front	93.7	157.3	63.8	50.6	2191	ohc	four	98	mpfi	3.03	3.39	7.6	102	5500	24	30	8558	2019	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
29	-1	110	dodge	gas	std	four	wagon	fwd	front	103.3	174.6	64.6	59.8	2535	ohc	four	122	2bbl	3.34	3.46	8.5	88	5000	24	30	8921	2017	Station Wagon	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
30	3	145	dodge	gas	turbo	two	hatchback	fwd	front	95.9	173.2	66.3	50.2	2811	ohc	four	156	mfi	3.6	3.9	7	145	5000	19	24	12964	2017	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
31	2	137	honda	gas	std	two	hatchback	fwd	front	86.6	144.6	63.9	50.8	1713	ohc	four	92	1bbl	2.91	3.41	9.6	58	4800	49	54	6479	2017	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
32	2	137	honda	gas	std	two	hatchback	fwd	front	86.6	144.6	63.9	50.8	1819	ohc	four	92	1bbl	2.91	3.41	9.2	76	6000	31	38	6855	2019	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
33	1	101	honda	gas	std	two	hatchback	fwd	front	93.7	150	64	52.6	1837	ohc	four	79	1bbl	2.91	3.07	10.1	60	5500	38	42	5399	2019	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
34	1	101	honda	gas	std	two	hatchback	fwd	front	93.7	150	64	52.6	1940	ohc	four	92	1bbl	2.91	3.41	9.2	76	6000	30	34	6529	2018	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
35	1	101	honda	gas	std	two	hatchback	fwd	front	93.7	150	64	52.6	1956	ohc	four	92	1bbl	2.91	3.41	9.2	76	6000	30	34	7129	2019	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
36	0	110	honda	gas	std	four	sedan	fwd	front	96.5	163.4	64	54.5	2010	ohc	four	92	1bbl	2.91	3.41	9.2	76	6000	30	34	7295	2020	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
37	0	78	honda	gas	std	four	wagon	fwd	front	96.5	157.1	63.9	58.3	2024	ohc	four	92	1bbl	2.92	3.41	9.2	76	6000	30	34	7295	2020	Station Wagon	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
38	0	106	honda	gas	std	two	hatchback	fwd	front	96.5	167.5	65.2	53.3	2236	ohc	four	110	1bbl	3.15	3.58	9	86	5800	27	33	7895	2018	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
39	0	106	honda	gas	std	two	hatchback	fwd	front	96.5	167.5	65.2	53.3	2289	ohc	four	110	1bbl	3.15	3.58	9	86	5800	27	33	9095	2019	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
40	0	85	honda	gas	std	four	sedan	fwd	front	96.5	175.4	65.2	54.1	2304	ohc	four	110	1bbl	3.15	3.58	9	86	5800	27	33	8845	2021	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
41	0	85	honda	gas	std	four	sedan	fwd	front	96.5	175.4	62.5	54.1	2372	ohc	four	110	1bbl	3.15	3.58	9	86	5800	27	33	10295	2020	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
42	0	85	honda	gas	std	four	sedan	fwd	front	96.5	175.4	65.2	54.1	2465	ohc	four	110	mpfi	3.15	3.58	9	101	5800	24	28	12945	2020	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
43	1	107	honda	gas	std	two	sedan	fwd	front	96.5	169.1	66	51	2293	ohc	four	110	2bbl	3.15	3.58	9.1	100	5500	25	31	10345	2019	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
44	0	122	isuzu	gas	std	four	sedan	rwd	front	94.3	170.7	61.8	53.5	2337	ohc	four	111	2bbl	3.31	3.23	8.5	78	4800	24	29	6785	2020	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
45	1	122	isuzu	gas	std	two	sedan	fwd	front	94.5	155.9	63.6	52	1874	ohc	four	90	2bbl	3.03	3.11	9.6	70	5400	38	43	13207.129353233831	2019	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
46	0	122	isuzu	gas	std	four	sedan	fwd	front	94.5	155.9	63.6	52	1909	ohc	four	90	2bbl	3.03	3.11	9.6	70	5400	38	43	13207.129353233831	2022	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
47	2	122	isuzu	gas	std	two	hatchback	rwd	front	96	172.6	65.2	51.4	2734	ohc	four	119	spfi	3.43	3.23	9.2	90	5000	24	29	11048	2021	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
48	0	145	jaguar	gas	std	four	sedan	rwd	front	113	199.6	69.6	52.8	4066	dohc	six	258	mpfi	3.63	4.17	8.1	176	4750	15	19	32250	2018	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
49	0	122	jaguar	gas	std	four	sedan	rwd	front	113	199.6	69.6	52.8	4066	dohc	six	258	mpfi	3.63	4.17	8.1	176	4750	15	19	35550	2020	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
50	0	122	jaguar	gas	std	two	sedan	rwd	front	102	191.7	70.6	47.8	3950	ohcv	twelve	326	mpfi	3.54	2.76	11.5	262	5000	13	17	36000	2018	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
51	1	104	mazda	gas	std	two	hatchback	fwd	front	93.1	159.1	64.2	54.1	1890	ohc	four	91	2bbl	3.03	3.15	9	68	5000	30	31	5195	2021	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
52	1	104	mazda	gas	std	two	hatchback	fwd	front	93.1	159.1	64.2	54.1	1900	ohc	four	91	2bbl	3.03	3.15	9	68	5000	31	38	6095	2021	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
53	1	104	mazda	gas	std	two	hatchback	fwd	front	93.1	159.1	64.2	54.1	1905	ohc	four	91	2bbl	3.03	3.15	9	68	5000	31	38	6795	2019	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
54	1	113	mazda	gas	std	four	sedan	fwd	front	93.1	166.8	64.2	54.1	1945	ohc	four	91	2bbl	3.03	3.15	9	68	5000	31	38	6695	2018	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
55	1	113	mazda	gas	std	four	sedan	fwd	front	93.1	166.8	64.2	54.1	1950	ohc	four	91	2bbl	3.08	3.15	9	68	5000	31	38	7395	2018	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
56	3	150	mazda	gas	std	two	hatchback	rwd	front	95.3	169	65.7	49.6	2380	rotor	two	70	4bbl	3.3297512437810943	3.255422885572139	9.4	101	6000	17	23	10945	2022	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
57	3	150	mazda	gas	std	two	hatchback	rwd	front	95.3	169	65.7	49.6	2380	rotor	two	70	4bbl	3.3297512437810943	3.255422885572139	9.4	101	6000	17	23	11845	2019	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
58	3	150	mazda	gas	std	two	hatchback	rwd	front	95.3	169	65.7	49.6	2385	rotor	two	70	4bbl	3.3297512437810943	3.255422885572139	9.4	101	6000	17	23	13645	2022	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
59	3	150	mazda	gas	std	two	hatchback	rwd	front	95.3	169	65.7	49.6	2500	rotor	two	80	mpfi	3.3297512437810943	3.255422885572139	9.4	135	6000	16	23	15645	2020	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
60	1	129	mazda	gas	std	two	hatchback	fwd	front	98.8	177.8	66.5	53.7	2385	ohc	four	122	2bbl	3.39	3.39	8.6	84	4800	26	32	8845	2019	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
61	0	115	mazda	gas	std	four	sedan	fwd	front	98.8	177.8	66.5	55.5	2410	ohc	four	122	2bbl	3.39	3.39	8.6	84	4800	26	32	8495	2018	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
62	1	129	mazda	gas	std	two	hatchback	fwd	front	98.8	177.8	66.5	53.7	2385	ohc	four	122	2bbl	3.39	3.39	8.6	84	4800	26	32	10595	2020	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
63	0	115	mazda	gas	std	four	sedan	fwd	front	98.8	177.8	66.5	55.5	2410	ohc	four	122	2bbl	3.39	3.39	8.6	84	4800	26	32	10245	2017	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
64	0	122	mazda	diesel	std	four	sedan	fwd	front	98.8	177.8	66.5	55.5	2443	ohc	four	122	idi	3.39	3.39	22.7	64	4650	36	42	10795	2017	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
65	0	115	mazda	gas	std	four	hatchback	fwd	front	98.8	177.8	66.5	55.5	2425	ohc	four	122	2bbl	3.39	3.39	8.6	84	4800	26	32	11245	2021	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
66	0	118	mazda	gas	std	four	sedan	rwd	front	104.9	175	66.1	54.4	2670	ohc	four	140	mpfi	3.76	3.16	8	120	5000	19	27	18280	2019	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
67	0	122	mazda	diesel	std	four	sedan	rwd	front	104.9	175	66.1	54.4	2700	ohc	four	134	idi	3.43	3.64	22	72	4200	31	39	18344	2021	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
68	-1	93	mercedes-benz	diesel	turbo	four	sedan	rwd	front	110	190.9	70.3	56.5	3515	ohc	five	183	idi	3.58	3.64	21.5	123	4350	22	25	25552	2020	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
69	-1	93	mercedes-benz	diesel	turbo	four	wagon	rwd	front	110	190.9	70.3	58.7	3750	ohc	five	183	idi	3.58	3.64	21.5	123	4350	22	25	28248	2019	Station Wagon	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
70	0	93	mercedes-benz	diesel	turbo	two	hardtop	rwd	front	106.7	187.5	70.3	54.9	3495	ohc	five	183	idi	3.58	3.64	21.5	123	4350	22	25	28176	2019	Hardtop	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
71	-1	93	mercedes-benz	diesel	turbo	four	sedan	rwd	front	115.6	202.6	71.7	56.3	3770	ohc	five	183	idi	3.58	3.64	21.5	123	4350	22	25	31600	2022	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
72	-1	122	mercedes-benz	gas	std	four	sedan	rwd	front	115.6	202.6	71.7	56.5	3740	ohcv	eight	234	mpfi	3.46	3.1	8.3	155	4750	16	18	34184	2020	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
73	3	142	mercedes-benz	gas	std	two	convertible	rwd	front	96.6	180.3	70.5	50.8	3685	ohcv	eight	234	mpfi	3.46	3.1	8.3	155	4750	16	18	35056	2022	Convertible	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
74	0	122	mercedes-benz	gas	std	four	sedan	rwd	front	120.9	208.1	71.7	56.7	3900	ohcv	eight	308	mpfi	3.8	3.35	8	184	4500	14	16	40960	2017	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
75	1	122	mercedes-benz	gas	std	two	hardtop	rwd	front	112	199.2	72	55.4	3715	ohcv	eight	304	mpfi	3.8	3.35	8	184	4500	14	16	45400	2020	Hardtop	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
76	1	122	mercury	gas	turbo	two	hatchback	rwd	front	102.7	178.4	68	54.8	2910	ohc	four	140	mpfi	3.78	3.12	8	175	5000	19	24	16503	2020	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
77	2	161	mitsubishi	gas	std	two	hatchback	fwd	front	93.7	157.3	64.4	50.8	1918	ohc	four	92	2bbl	2.97	3.23	9.4	68	5500	37	41	5389	2022	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
78	2	161	mitsubishi	gas	std	two	hatchback	fwd	front	93.7	157.3	64.4	50.8	1944	ohc	four	92	2bbl	2.97	3.23	9.4	68	5500	31	38	6189	2022	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
79	2	161	mitsubishi	gas	std	two	hatchback	fwd	front	93.7	157.3	64.4	50.8	2004	ohc	four	92	2bbl	2.97	3.23	9.4	68	5500	31	38	6669	2020	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
80	1	161	mitsubishi	gas	turbo	two	hatchback	fwd	front	93	157.3	63.8	50.8	2145	ohc	four	98	spdi	3.03	3.39	7.6	102	5500	24	30	7689	2021	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
81	3	153	mitsubishi	gas	turbo	two	hatchback	fwd	front	96.3	173	65.4	49.4	2370	ohc	four	110	spdi	3.17	3.46	7.5	116	5500	23	30	9959	2018	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
82	3	153	mitsubishi	gas	std	two	hatchback	fwd	front	96.3	173	65.4	49.4	2328	ohc	four	122	2bbl	3.35	3.46	8.5	88	5000	25	32	8499	2018	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
83	3	122	mitsubishi	gas	turbo	two	hatchback	fwd	front	95.9	173.2	66.3	50.2	2833	ohc	four	156	spdi	3.58	3.86	7	145	5000	19	24	12629	2020	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
84	3	122	mitsubishi	gas	turbo	two	hatchback	fwd	front	95.9	173.2	66.3	50.2	2921	ohc	four	156	spdi	3.59	3.86	7	145	5000	19	24	14869	2022	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
85	3	122	mitsubishi	gas	turbo	two	hatchback	fwd	front	95.9	173.2	66.3	50.2	2926	ohc	four	156	spdi	3.59	3.86	7	145	5000	19	24	14489	2018	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
86	1	125	mitsubishi	gas	std	four	sedan	fwd	front	96.3	172.4	65.4	51.6	2365	ohc	four	122	2bbl	3.35	3.46	8.5	88	5000	25	32	6989	2021	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
87	1	125	mitsubishi	gas	std	four	sedan	fwd	front	96.3	172.4	65.4	51.6	2405	ohc	four	122	2bbl	3.35	3.46	8.5	88	5000	25	32	8189	2021	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
88	1	125	mitsubishi	gas	turbo	four	sedan	fwd	front	96.3	172.4	65.4	51.6	2403	ohc	four	110	spdi	3.17	3.46	7.5	116	5500	23	30	9279	2020	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
89	-1	137	mitsubishi	gas	std	four	sedan	fwd	front	96.3	172.4	65.4	51.6	2403	ohc	four	110	spdi	3.17	3.46	7.5	116	5500	23	30	9279	2020	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
90	1	128	nissan	gas	std	two	sedan	fwd	front	94.5	165.3	63.8	54.5	1889	ohc	four	97	2bbl	3.15	3.29	9.4	69	5200	31	37	5499	2019	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
91	1	128	nissan	diesel	std	two	sedan	fwd	front	94.5	165.3	63.8	54.5	2017	ohc	four	103	idi	2.99	3.47	21.9	55	4800	45	50	7099	2021	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
92	1	128	nissan	gas	std	two	sedan	fwd	front	94.5	165.3	63.8	54.5	1918	ohc	four	97	2bbl	3.15	3.29	9.4	69	5200	31	37	6649	2019	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
93	1	122	nissan	gas	std	four	sedan	fwd	front	94.5	165.3	63.8	54.5	1938	ohc	four	97	2bbl	3.15	3.29	9.4	69	5200	31	37	6849	2021	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
94	1	103	nissan	gas	std	four	wagon	fwd	front	94.5	170.2	63.8	53.5	2024	ohc	four	97	2bbl	3.15	3.29	9.4	69	5200	31	37	7349	2017	Station Wagon	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
95	1	128	nissan	gas	std	two	sedan	fwd	front	94.5	165.3	63.8	54.5	1951	ohc	four	97	2bbl	3.15	3.29	9.4	69	5200	31	37	7299	2021	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
96	1	128	nissan	gas	std	two	hatchback	fwd	front	94.5	165.6	63.8	53.3	2028	ohc	four	97	2bbl	3.15	3.29	9.4	69	5200	31	37	7799	2019	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
97	1	122	nissan	gas	std	four	sedan	fwd	front	94.5	165.3	63.8	54.5	1971	ohc	four	97	2bbl	3.15	3.29	9.4	69	5200	31	37	7499	2021	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
98	1	103	nissan	gas	std	four	wagon	fwd	front	94.5	170.2	63.8	53.5	2037	ohc	four	97	2bbl	3.15	3.29	9.4	69	5200	31	37	7999	2020	Station Wagon	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
99	2	168	nissan	gas	std	two	hardtop	fwd	front	95.1	162.4	63.8	53.3	2008	ohc	four	97	2bbl	3.15	3.29	9.4	69	5200	31	37	8249	2018	Hardtop	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
100	0	106	nissan	gas	std	four	hatchback	fwd	front	97.2	173.4	65.2	54.7	2324	ohc	four	120	2bbl	3.33	3.47	8.5	97	5200	27	34	8949	2019	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
101	0	106	nissan	gas	std	four	sedan	fwd	front	97.2	173.4	65.2	54.7	2302	ohc	four	120	2bbl	3.33	3.47	8.5	97	5200	27	34	9549	2018	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
102	0	128	nissan	gas	std	four	sedan	fwd	front	100.4	181.7	66.5	55.1	3095	ohcv	six	181	mpfi	3.43	3.27	9	152	5200	17	22	13499	2022	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
103	0	108	nissan	gas	std	four	wagon	fwd	front	100.4	184.6	66.5	56.1	3296	ohcv	six	181	mpfi	3.43	3.27	9	152	5200	17	22	14399	2020	Station Wagon	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
104	0	108	nissan	gas	std	four	sedan	fwd	front	100.4	184.6	66.5	55.1	3060	ohcv	six	181	mpfi	3.43	3.27	9	152	5200	19	25	13499	2019	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
105	3	194	nissan	gas	std	two	hatchback	rwd	front	91.3	170.7	67.9	49.7	3071	ohcv	six	181	mpfi	3.43	3.27	9	160	5200	19	25	17199	2018	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
106	3	194	nissan	gas	turbo	two	hatchback	rwd	front	91.3	170.7	67.9	49.7	3139	ohcv	six	181	mpfi	3.43	3.27	7.8	200	5200	17	23	19699	2018	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
107	1	231	nissan	gas	std	two	hatchback	rwd	front	99.2	178.5	67.9	49.7	3139	ohcv	six	181	mpfi	3.43	3.27	9	160	5200	19	25	18399	2018	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
108	0	161	peugot	gas	std	four	sedan	rwd	front	107.9	186.7	68.4	56.7	3020	l	four	120	mpfi	3.46	3.19	8.4	97	5000	19	24	11900	2022	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
109	0	161	peugot	diesel	turbo	four	sedan	rwd	front	107.9	186.7	68.4	56.7	3197	l	four	152	idi	3.7	3.52	21	95	4150	28	33	13200	2017	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
110	0	122	peugot	gas	std	four	wagon	rwd	front	114.2	198.9	68.4	58.7	3230	l	four	120	mpfi	3.46	3.19	8.4	97	5000	19	24	12440	2019	Station Wagon	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
111	0	122	peugot	diesel	turbo	four	wagon	rwd	front	114.2	198.9	68.4	58.7	3430	l	four	152	idi	3.7	3.52	21	95	4150	25	25	13860	2019	Station Wagon	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
112	0	161	peugot	gas	std	four	sedan	rwd	front	107.9	186.7	68.4	56.7	3075	l	four	120	mpfi	3.46	2.19	8.4	95	5000	19	24	15580	2019	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
113	0	161	peugot	diesel	turbo	four	sedan	rwd	front	107.9	186.7	68.4	56.7	3252	l	four	152	idi	3.7	3.52	21	95	4150	28	33	16900	2017	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
114	0	122	peugot	gas	std	four	wagon	rwd	front	114.2	198.9	68.4	56.7	3285	l	four	120	mpfi	3.46	2.19	8.4	95	5000	19	24	16695	2021	Station Wagon	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
115	0	122	peugot	diesel	turbo	four	wagon	rwd	front	114.2	198.9	68.4	58.7	3485	l	four	152	idi	3.7	3.52	21	95	4150	25	25	17075	2022	Station Wagon	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
116	0	161	peugot	gas	std	four	sedan	rwd	front	107.9	186.7	68.4	56.7	3075	l	four	120	mpfi	3.46	3.19	8.4	97	5000	19	24	16630	2018	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
117	0	161	peugot	diesel	turbo	four	sedan	rwd	front	107.9	186.7	68.4	56.7	3252	l	four	152	idi	3.7	3.52	21	95	4150	28	33	17950	2020	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
118	0	161	peugot	gas	turbo	four	sedan	rwd	front	108	186.7	68.3	56	3130	l	four	134	mpfi	3.61	3.21	7	142	5600	18	24	18150	2021	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
119	1	119	plymouth	gas	std	two	hatchback	fwd	front	93.7	157.3	63.8	50.8	1918	ohc	four	90	2bbl	2.97	3.23	9.4	68	5500	37	41	5572	2022	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
120	1	119	plymouth	gas	turbo	two	hatchback	fwd	front	93.7	157.3	63.8	50.8	2128	ohc	four	98	spdi	3.03	3.39	7.6	102	5500	24	30	7957	2019	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
121	1	154	plymouth	gas	std	four	hatchback	fwd	front	93.7	157.3	63.8	50.6	1967	ohc	four	90	2bbl	2.97	3.23	9.4	68	5500	31	38	6229	2021	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
122	1	154	plymouth	gas	std	four	sedan	fwd	front	93.7	167.3	63.8	50.8	1989	ohc	four	90	2bbl	2.97	3.23	9.4	68	5500	31	38	6692	2017	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
123	1	154	plymouth	gas	std	four	sedan	fwd	front	93.7	167.3	63.8	50.8	2191	ohc	four	98	2bbl	2.97	3.23	9.4	68	5500	31	38	7609	2019	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
124	-1	74	plymouth	gas	std	four	wagon	fwd	front	103.3	174.6	64.6	59.8	2535	ohc	four	122	2bbl	3.35	3.46	8.5	88	5000	24	30	8921	2019	Station Wagon	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
125	3	122	plymouth	gas	turbo	two	hatchback	rwd	front	95.9	173.2	66.3	50.2	2818	ohc	four	156	spdi	3.59	3.86	7	145	5000	19	24	12764	2019	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
126	3	186	porsche	gas	std	two	hatchback	rwd	front	94.5	168.9	68.3	50.2	2778	ohc	four	151	mpfi	3.94	3.11	9.5	143	5500	19	27	22018	2018	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
127	3	122	porsche	gas	std	two	hardtop	rwd	rear	89.5	168.9	65	51.6	2756	ohcf	six	194	mpfi	3.74	2.9	9.5	207	5900	17	25	32528	2019	Hardtop	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
128	3	122	porsche	gas	std	two	hardtop	rwd	rear	89.5	168.9	65	51.6	2756	ohcf	six	194	mpfi	3.74	2.9	9.5	207	5900	17	25	34028	2021	Hardtop	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
129	3	122	porsche	gas	std	two	convertible	rwd	rear	89.5	168.9	65	51.6	2800	ohcf	six	194	mpfi	3.74	2.9	9.5	207	5900	17	25	37028	2019	Convertible	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
130	1	122	porsche	gas	std	two	hatchback	rwd	front	98.4	175.7	72.3	50.5	3366	dohcv	eight	203	mpfi	3.94	3.11	10	288	5750	17	28	13207.129353233831	2022	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
131	0	122	renault	gas	std	four	wagon	fwd	front	96.1	181.5	66.5	55.2	2579	ohc	four	132	mpfi	3.46	3.9	8.7	104	5125	23	31	9295	2021	Station Wagon	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
132	2	122	renault	gas	std	two	hatchback	fwd	front	96.1	176.8	66.6	50.5	2460	ohc	four	132	mpfi	3.46	3.9	8.7	104	5125	23	31	9895	2018	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
133	3	150	saab	gas	std	two	hatchback	fwd	front	99.1	186.6	66.5	56.1	2658	ohc	four	121	mpfi	3.54	3.07	9.31	110	5250	21	28	11850	2021	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
134	2	104	saab	gas	std	four	sedan	fwd	front	99.1	186.6	66.5	56.1	2695	ohc	four	121	mpfi	3.54	3.07	9.3	110	5250	21	28	12170	2017	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
135	3	150	saab	gas	std	two	hatchback	fwd	front	99.1	186.6	66.5	56.1	2707	ohc	four	121	mpfi	2.54	2.07	9.3	110	5250	21	28	15040	2021	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
136	2	104	saab	gas	std	four	sedan	fwd	front	99.1	186.6	66.5	56.1	2758	ohc	four	121	mpfi	3.54	3.07	9.3	110	5250	21	28	15510	2017	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
137	3	150	saab	gas	turbo	two	hatchback	fwd	front	99.1	186.6	66.5	56.1	2808	dohc	four	121	mpfi	3.54	3.07	9	160	5500	19	26	18150	2018	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
138	2	104	saab	gas	turbo	four	sedan	fwd	front	99.1	186.6	66.5	56.1	2847	dohc	four	121	mpfi	3.54	3.07	9	160	5500	19	26	18620	2021	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
139	2	83	subaru	gas	std	two	hatchback	fwd	front	93.7	156.9	63.4	53.7	2050	ohcf	four	97	2bbl	3.62	2.36	9	69	4900	31	36	5118	2020	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
140	2	83	subaru	gas	std	two	hatchback	fwd	front	93.7	157.9	63.6	53.7	2120	ohcf	four	108	2bbl	3.62	2.64	8.7	73	4400	26	31	7053	2020	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
141	2	83	subaru	gas	std	two	hatchback	4wd	front	93.3	157.3	63.8	55.7	2240	ohcf	four	108	2bbl	3.62	2.64	8.7	73	4400	26	31	7603	2018	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
142	0	102	subaru	gas	std	four	sedan	fwd	front	97.2	172	65.4	52.5	2145	ohcf	four	108	2bbl	3.62	2.64	9.5	82	4800	32	37	7126	2018	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
143	0	102	subaru	gas	std	four	sedan	fwd	front	97.2	172	65.4	52.5	2190	ohcf	four	108	2bbl	3.62	2.64	9.5	82	4400	28	33	7775	2020	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
144	0	102	subaru	gas	std	four	sedan	fwd	front	97.2	172	65.4	52.5	2340	ohcf	four	108	mpfi	3.62	2.64	9	94	5200	26	32	9960	2018	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
145	0	102	subaru	gas	std	four	sedan	4wd	front	97	172	65.4	54.3	2385	ohcf	four	108	2bbl	3.62	2.64	9	82	4800	24	25	9233	2017	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
146	0	102	subaru	gas	turbo	four	sedan	4wd	front	97	172	65.4	54.3	2510	ohcf	four	108	mpfi	3.62	2.64	7.7	111	4800	24	29	11259	2022	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
147	0	89	subaru	gas	std	four	wagon	fwd	front	97	173.5	65.4	53	2290	ohcf	four	108	2bbl	3.62	2.64	9	82	4800	28	32	7463	2018	Station Wagon	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
148	0	89	subaru	gas	std	four	wagon	fwd	front	97	173.5	65.4	53	2455	ohcf	four	108	mpfi	3.62	2.64	9	94	5200	25	31	10198	2017	Station Wagon	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
149	0	85	subaru	gas	std	four	wagon	4wd	front	96.9	173.6	65.4	54.9	2420	ohcf	four	108	2bbl	3.62	2.64	9	82	4800	23	29	8013	2021	Station Wagon	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
150	0	85	subaru	gas	turbo	four	wagon	4wd	front	96.9	173.6	65.4	54.9	2650	ohcf	four	108	mpfi	3.62	2.64	7.7	111	4800	23	23	11694	2021	Station Wagon	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
151	1	87	toyota	gas	std	two	hatchback	fwd	front	95.7	158.7	63.6	54.5	1985	ohc	four	92	2bbl	3.05	3.03	9	62	4800	35	39	5348	2021	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
152	1	87	toyota	gas	std	two	hatchback	fwd	front	95.7	158.7	63.6	54.5	2040	ohc	four	92	2bbl	3.05	3.03	9	62	4800	31	38	6338	2018	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
153	1	74	toyota	gas	std	four	hatchback	fwd	front	95.7	158.7	63.6	54.5	2015	ohc	four	92	2bbl	3.05	3.03	9	62	4800	31	38	6488	2017	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
154	0	77	toyota	gas	std	four	wagon	fwd	front	95.7	169.7	63.6	59.1	2280	ohc	four	92	2bbl	3.05	3.03	9	62	4800	31	37	6918	2017	Station Wagon	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
155	0	81	toyota	gas	std	four	wagon	4wd	front	95.7	169.7	63.6	59.1	2290	ohc	four	92	2bbl	3.05	3.03	9	62	4800	27	32	7898	2018	Station Wagon	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
156	0	91	toyota	gas	std	four	wagon	4wd	front	95.7	169.7	63.6	59.1	3110	ohc	four	92	2bbl	3.05	3.03	9	62	4800	27	32	8778	2019	Station Wagon	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
157	0	91	toyota	gas	std	four	sedan	fwd	front	95.7	166.3	64.4	53	2081	ohc	four	98	2bbl	3.19	3.03	9	70	4800	30	37	6938	2018	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
158	0	91	toyota	gas	std	four	hatchback	fwd	front	95.7	166.3	64.4	52.8	2109	ohc	four	98	2bbl	3.19	3.03	9	70	4800	30	37	7198	2020	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
159	0	91	toyota	diesel	std	four	sedan	fwd	front	95.7	166.3	64.4	53	2275	ohc	four	110	idi	3.27	3.35	22.5	56	4500	34	36	7898	2022	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
160	0	91	toyota	diesel	std	four	hatchback	fwd	front	95.7	166.3	64.4	52.8	2275	ohc	four	110	idi	3.27	3.35	22.5	56	4500	38	47	7788	2021	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
161	0	91	toyota	gas	std	four	sedan	fwd	front	95.7	166.3	64.4	53	2094	ohc	four	98	2bbl	3.19	3.03	9	70	4800	38	47	7738	2019	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
162	0	91	toyota	gas	std	four	hatchback	fwd	front	95.7	166.3	64.4	52.8	2122	ohc	four	98	2bbl	3.19	3.03	9	70	4800	28	34	8358	2019	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
163	0	91	toyota	gas	std	four	sedan	fwd	front	95.7	166.3	64.4	52.8	2140	ohc	four	98	2bbl	3.19	3.03	9	70	4800	28	34	9258	2022	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
164	1	168	toyota	gas	std	two	sedan	rwd	front	94.5	168.7	64	52.6	2169	ohc	four	98	2bbl	3.19	3.03	9	70	4800	29	34	8058	2019	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
165	1	168	toyota	gas	std	two	hatchback	rwd	front	94.5	168.7	64	52.6	2204	ohc	four	98	2bbl	3.19	3.03	9	70	4800	29	34	8238	2017	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
166	1	168	toyota	gas	std	two	sedan	rwd	front	94.5	168.7	64	52.6	2265	dohc	four	98	mpfi	3.24	3.08	9.4	112	6600	26	29	9298	2018	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
167	1	168	toyota	gas	std	two	hatchback	rwd	front	94.5	168.7	64	52.6	2300	dohc	four	98	mpfi	3.24	3.08	9.4	112	6600	26	29	9538	2017	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
168	2	134	toyota	gas	std	two	hardtop	rwd	front	98.4	176.2	65.6	52	2540	ohc	four	146	mpfi	3.62	3.5	9.3	116	4800	24	30	8449	2022	Hardtop	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
169	2	134	toyota	gas	std	two	hardtop	rwd	front	98.4	176.2	65.6	52	2536	ohc	four	146	mpfi	3.62	3.5	9.3	116	4800	24	30	9639	2022	Hardtop	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
170	2	134	toyota	gas	std	two	hatchback	rwd	front	98.4	176.2	65.6	52	2551	ohc	four	146	mpfi	3.62	3.5	9.3	116	4800	24	30	9989	2019	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
171	2	134	toyota	gas	std	two	hardtop	rwd	front	98.4	176.2	65.6	52	2679	ohc	four	146	mpfi	3.62	3.5	9.3	116	4800	24	30	11199	2021	Hardtop	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
172	2	134	toyota	gas	std	two	hatchback	rwd	front	98.4	176.2	65.6	52	2714	ohc	four	146	mpfi	3.62	3.5	9.3	116	4800	24	30	11549	2021	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
173	2	134	toyota	gas	std	two	convertible	rwd	front	98.4	176.2	65.6	53	2975	ohc	four	146	mpfi	3.62	3.5	9.3	116	4800	24	30	17669	2020	Convertible	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
174	-1	65	toyota	gas	std	four	sedan	fwd	front	102.4	175.6	66.5	54.9	2326	ohc	four	122	mpfi	3.31	3.54	8.7	92	4200	29	34	8948	2020	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
175	-1	65	toyota	diesel	turbo	four	sedan	fwd	front	102.4	175.6	66.5	54.9	2480	ohc	four	110	idi	3.27	3.35	22.5	73	4500	30	33	10698	2017	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
176	-1	65	toyota	gas	std	four	hatchback	fwd	front	102.4	175.6	66.5	53.9	2414	ohc	four	122	mpfi	3.31	3.54	8.7	92	4200	27	32	9988	2018	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
177	-1	65	toyota	gas	std	four	sedan	fwd	front	102.4	175.6	66.5	54.9	2414	ohc	four	122	mpfi	3.31	3.54	8.7	92	4200	27	32	10898	2018	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
178	-1	65	toyota	gas	std	four	hatchback	fwd	front	102.4	175.6	66.5	53.9	2458	ohc	four	122	mpfi	3.31	3.54	8.7	92	4200	27	32	11248	2021	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
179	3	197	toyota	gas	std	two	hatchback	rwd	front	102.9	183.5	67.7	52	2976	dohc	six	171	mpfi	3.27	3.35	9.3	161	5200	20	24	16558	2021	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
180	3	197	toyota	gas	std	two	hatchback	rwd	front	102.9	183.5	67.7	52	3016	dohc	six	171	mpfi	3.27	3.35	9.3	161	5200	19	24	15998	2018	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
181	-1	90	toyota	gas	std	four	sedan	rwd	front	104.5	187.8	66.5	54.1	3131	dohc	six	171	mpfi	3.27	3.35	9.2	156	5200	20	24	15690	2019	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
182	-1	122	toyota	gas	std	four	wagon	rwd	front	104.5	187.8	66.5	54.1	3151	dohc	six	161	mpfi	3.27	3.35	9.2	156	5200	19	24	15750	2017	Station Wagon	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
183	2	122	volkswagen	diesel	std	two	sedan	fwd	front	97.3	171.7	65.5	55.7	2261	ohc	four	97	idi	3.01	3.4	23	52	4800	37	46	7775	2017	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
184	2	122	volkswagen	gas	std	two	sedan	fwd	front	97.3	171.7	65.5	55.7	2209	ohc	four	109	mpfi	3.19	3.4	9	85	5250	27	34	7975	2022	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
185	2	94	volkswagen	diesel	std	four	sedan	fwd	front	97.3	171.7	65.5	55.7	2264	ohc	four	97	idi	3.01	3.4	23	52	4800	37	46	7995	2019	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
186	2	94	volkswagen	gas	std	four	sedan	fwd	front	97.3	171.7	65.5	55.7	2212	ohc	four	109	mpfi	3.19	3.4	9	85	5250	27	34	8195	2022	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
187	2	94	volkswagen	gas	std	four	sedan	fwd	front	97.3	171.7	65.5	55.7	2275	ohc	four	109	mpfi	3.19	3.4	9	85	5250	27	34	8495	2021	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
188	2	94	volkswagen	diesel	turbo	four	sedan	fwd	front	97.3	171.7	65.5	55.7	2319	ohc	four	97	idi	3.01	3.4	23	68	4500	37	42	9495	2017	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
189	2	94	volkswagen	gas	std	four	sedan	fwd	front	97.3	171.7	65.5	55.7	2300	ohc	four	109	mpfi	3.19	3.4	10	100	5500	26	32	9995	2018	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
190	3	122	volkswagen	gas	std	two	convertible	fwd	front	94.5	159.3	64.2	55.6	2254	ohc	four	109	mpfi	3.19	3.4	8.5	90	5500	24	29	11595	2021	Convertible	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
191	3	256	volkswagen	gas	std	two	hatchback	fwd	front	94.5	165.7	64	51.4	2221	ohc	four	109	mpfi	3.19	3.4	8.5	90	5500	24	29	9980	2020	Hatchback	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
192	0	122	volkswagen	gas	std	four	sedan	fwd	front	100.4	180.2	66.9	55.1	2661	ohc	five	136	mpfi	3.19	3.4	8.5	110	5500	19	24	13295	2020	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
193	0	122	volkswagen	diesel	turbo	four	sedan	fwd	front	100.4	180.2	66.9	55.1	2579	ohc	four	97	idi	3.01	3.4	23	68	4500	33	38	13845	2020	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
194	0	122	volkswagen	gas	std	four	wagon	fwd	front	100.4	183.1	66.9	55.1	2563	ohc	four	109	mpfi	3.19	3.4	9	88	5500	25	31	12290	2018	Station Wagon	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
195	-2	103	volvo	gas	std	four	sedan	rwd	front	104.3	188.8	67.2	56.2	2912	ohc	four	141	mpfi	3.78	3.15	9.5	114	5400	23	28	12940	2018	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
196	-1	74	volvo	gas	std	four	wagon	rwd	front	104.3	188.8	67.2	57.5	3034	ohc	four	141	mpfi	3.78	3.15	9.5	114	5400	23	28	13415	2019	Station Wagon	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
197	-2	103	volvo	gas	std	four	sedan	rwd	front	104.3	188.8	67.2	56.2	2935	ohc	four	141	mpfi	3.78	3.15	9.5	114	5400	24	28	15985	2020	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
198	-1	74	volvo	gas	std	four	wagon	rwd	front	104.3	188.8	67.2	57.5	3042	ohc	four	141	mpfi	3.78	3.15	9.5	114	5400	24	28	16515	2017	Station Wagon	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
199	-2	103	volvo	gas	turbo	four	sedan	rwd	front	104.3	188.8	67.2	56.2	3045	ohc	four	130	mpfi	3.62	3.15	7.5	162	5100	17	22	18420	2017	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
200	-1	74	volvo	gas	turbo	four	wagon	rwd	front	104.3	188.8	67.2	57.5	3157	ohc	four	130	mpfi	3.62	3.15	7.5	162	5100	17	22	18950	2021	Station Wagon	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
201	-1	95	volvo	gas	std	four	sedan	rwd	front	109.1	188.8	68.9	55.5	2952	ohc	four	141	mpfi	3.78	3.15	9.5	114	5400	23	28	16845	2020	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
202	-1	95	volvo	gas	turbo	four	sedan	rwd	front	109.1	188.8	68.8	55.5	3049	ohc	four	141	mpfi	3.78	3.15	8.7	160	5300	19	25	19045	2019	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
203	-1	95	volvo	gas	std	four	sedan	rwd	front	109.1	188.8	68.9	55.5	3012	ohcv	six	173	mpfi	3.58	2.87	8.8	134	5500	18	23	21485	2019	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
204	-1	95	volvo	diesel	turbo	four	sedan	rwd	front	109.1	188.8	68.9	55.5	3217	ohc	six	145	idi	3.01	3.4	23	106	4800	26	27	22470	2019	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
205	-1	95	volvo	gas	turbo	four	sedan	rwd	front	109.1	188.8	68.9	55.5	3062	ohc	four	141	mpfi	3.78	3.15	9.5	114	5400	19	25	22625	2017	Sedan	2024-08-08 00:28:12.499+02	2024-08-08 00:28:12.499+02
\.


--
-- TOC entry 4812 (class 0 OID 17674)
-- Dependencies: 218
-- Data for Name: SavedSearches; Type: TABLE DATA; Schema: public; Owner: -
-- Data Pos: 16611
--

COPY public."SavedSearches" (id, title, "fuelFilter", "bodyStyleFilter", "minPrice", "maxPrice", "sortOption", "userId", "createdAt", "updatedAt") FROM stdin;
2	TEST 1			0	100000		4	2024-08-08 10:15:49.711+02	2024-08-08 10:15:49.711+02
8	Questa è una ricerca per una alfa-romero economica			0	100000		4	2024-08-08 10:33:28.063+02	2024-08-08 10:33:28.063+02
10	new search audi sedan new test 			0	100000		4	2024-08-08 18:24:32.131+02	2024-08-08 18:24:32.131+02
\.


--
-- TOC entry 4813 (class 0 OID 17689)
-- Dependencies: 219
-- Data for Name: Sessions; Type: TABLE DATA; Schema: public; Owner: -
-- Data Pos: 16791
--

COPY public."Sessions" (sid, expires, data, "createdAt", "updatedAt") FROM stdin;
usOE47JP8jLOZf3Jm4bOPa2OEj-k7iXv	2024-08-08 20:05:03.909+02	{"cookie":{"originalMaxAge":3600000,"expires":"2024-08-08T18:05:03.896Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"}}	2024-08-08 19:05:03.897+02	2024-08-08 19:05:03.909+02
\.


--
-- TOC entry 4810 (class 0 OID 17663)
-- Dependencies: 216
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: -
-- Data Pos: 16999
--

COPY public."Users" (id, username, password, "googleId", "createdAt", "updatedAt") FROM stdin;
1	alberto.cerea84@gmail.com	\N	108611110920107233478	2024-08-07 23:27:12.618+02	2024-08-07 23:27:12.618+02
4	test	$2b$10$JqriaJab2Ui8dtigDUsIKOnb/hut/El.BtcXKBaTkzKtogb86Q4aC	\N	2024-08-08 00:26:30.313+02	2024-08-08 00:26:30.313+02
\.


--
-- TOC entry 4826 (class 0 OID 0)
-- Dependencies: 220
-- Name: Automobiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
-- Data Pos: 0
--

SELECT pg_catalog.setval('public."Automobiles_id_seq"', 205, true);


--
-- TOC entry 4827 (class 0 OID 0)
-- Dependencies: 217
-- Name: SavedSearches_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
-- Data Pos: 0
--

SELECT pg_catalog.setval('public."SavedSearches_id_seq"', 12, true);


--
-- TOC entry 4828 (class 0 OID 0)
-- Dependencies: 215
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
-- Data Pos: 0
--

SELECT pg_catalog.setval('public."Users_id_seq"', 4, true);


--
-- TOC entry 4664 (class 2606 OID 17711)
-- Dependencies: 221
-- Name: Automobiles Automobiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public."Automobiles"
    ADD CONSTRAINT "Automobiles_pkey" PRIMARY KEY (id);


--
-- TOC entry 4660 (class 2606 OID 17683)
-- Dependencies: 218
-- Name: SavedSearches SavedSearches_pkey; Type: CONSTRAINT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public."SavedSearches"
    ADD CONSTRAINT "SavedSearches_pkey" PRIMARY KEY (id);


--
-- TOC entry 4662 (class 2606 OID 17695)
-- Dependencies: 219
-- Name: Sessions Sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public."Sessions"
    ADD CONSTRAINT "Sessions_pkey" PRIMARY KEY (sid);


--
-- TOC entry 4654 (class 2606 OID 17670)
-- Dependencies: 216
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 4656 (class 2606 OID 17700)
-- Dependencies: 216
-- Name: Users Users_username_key; Type: CONSTRAINT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);


--
-- TOC entry 4658 (class 2606 OID 17702)
-- Dependencies: 216
-- Name: Users Users_username_key1; Type: CONSTRAINT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key1" UNIQUE (username);


--
-- TOC entry 4665 (class 2606 OID 17684)
-- Dependencies: 216 4654 218
-- Name: SavedSearches SavedSearches_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public."SavedSearches"
    ADD CONSTRAINT "SavedSearches_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id);


-- Completed on 2024-08-08 22:11:41

--
-- PostgreSQL database dump complete
--

