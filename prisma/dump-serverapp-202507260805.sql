PGDMP                      }         	   serverapp    15.3 (Debian 15.3-1.pgdg120+1)    17.0 f    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16384 	   serverapp    DATABASE     t   CREATE DATABASE serverapp WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE serverapp;
                  	   wcarbajal    false                        2615    98305    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                  	   wcarbajal    false            �           0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                     	   wcarbajal    false    5            �           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                     	   wcarbajal    false    5            f           1247    98367    TipoProceso    TYPE     `   CREATE TYPE public."TipoProceso" AS ENUM (
    'Misional',
    'Soporte',
    'Estratégico'
);
     DROP TYPE public."TipoProceso";
       public            	   wcarbajal    false    5            �            1259    98440 	   Actividad    TABLE     �   CREATE TABLE public."Actividad" (
    id integer NOT NULL,
    nombre text NOT NULL,
    descripcion text,
    responsable text NOT NULL,
    "procedimientoId" integer
);
    DROP TABLE public."Actividad";
       public         heap r    	   wcarbajal    false    5            �            1259    98439    Actividad_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Actividad_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Actividad_id_seq";
       public            	   wcarbajal    false    5    233            �           0    0    Actividad_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."Actividad_id_seq" OWNED BY public."Actividad".id;
          public            	   wcarbajal    false    232            �            1259    98405    DetalleProceso    TABLE     �   CREATE TABLE public."DetalleProceso" (
    id integer NOT NULL,
    procedimiento text,
    indicadores text,
    "diagramaId" integer,
    "fichaId" integer,
    "procedimientoId" integer
);
 $   DROP TABLE public."DetalleProceso";
       public         heap r    	   wcarbajal    false    5            �            1259    98404    DetalleProceso_id_seq    SEQUENCE     �   CREATE SEQUENCE public."DetalleProceso_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."DetalleProceso_id_seq";
       public            	   wcarbajal    false    225    5            �           0    0    DetalleProceso_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."DetalleProceso_id_seq" OWNED BY public."DetalleProceso".id;
          public            	   wcarbajal    false    224            �            1259    98414    Diagrama    TABLE     �   CREATE TABLE public."Diagrama" (
    id integer NOT NULL,
    url text NOT NULL,
    "creadoEn" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "actualizadoEn" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Diagrama";
       public         heap r    	   wcarbajal    false    5            �            1259    98413    Diagrama_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Diagrama_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Diagrama_id_seq";
       public            	   wcarbajal    false    5    227            �           0    0    Diagrama_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Diagrama_id_seq" OWNED BY public."Diagrama".id;
          public            	   wcarbajal    false    226            �            1259    98374    Dueño    TABLE     �   CREATE TABLE public."Dueño" (
    id integer NOT NULL,
    oficina text NOT NULL,
    director text NOT NULL,
    "procesoId" integer,
    siglas text NOT NULL,
    correo text NOT NULL
);
    DROP TABLE public."Dueño";
       public         heap r    	   wcarbajal    false    5            �            1259    98373    Dueño_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Dueño_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Dueño_id_seq";
       public            	   wcarbajal    false    5    222            �           0    0    Dueño_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Dueño_id_seq" OWNED BY public."Dueño".id;
          public            	   wcarbajal    false    221            �            1259    98424    Ficha    TABLE     �   CREATE TABLE public."Ficha" (
    id integer NOT NULL,
    objetivo text,
    "objetivoEstratégico" text,
    alcance text,
    entradas text,
    salidas text,
    proveedores text,
    clientes text,
    riesgos text,
    registros text
);
    DROP TABLE public."Ficha";
       public         heap r    	   wcarbajal    false    5            �            1259    98423    Ficha_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Ficha_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Ficha_id_seq";
       public            	   wcarbajal    false    229    5            �           0    0    Ficha_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Ficha_id_seq" OWNED BY public."Ficha".id;
          public            	   wcarbajal    false    228            �            1259    98433    Procedimiento    TABLE     A   CREATE TABLE public."Procedimiento" (
    id integer NOT NULL
);
 #   DROP TABLE public."Procedimiento";
       public         heap r    	   wcarbajal    false    5            �            1259    98432    Procedimiento_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Procedimiento_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."Procedimiento_id_seq";
       public            	   wcarbajal    false    231    5            �           0    0    Procedimiento_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."Procedimiento_id_seq" OWNED BY public."Procedimiento".id;
          public            	   wcarbajal    false    230            �            1259    98351    Proceso    TABLE     �  CREATE TABLE public."Proceso" (
    id integer NOT NULL,
    nombre text NOT NULL,
    descripcion text,
    "parentId" integer,
    "creadoEn" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "actualizadoEn" timestamp(3) without time zone NOT NULL,
    codigo text NOT NULL,
    nivel integer NOT NULL,
    tipo public."TipoProceso" NOT NULL,
    estado boolean DEFAULT true,
    "detalleProcesoId" integer
);
    DROP TABLE public."Proceso";
       public         heap r    	   wcarbajal    false    870    5            �            1259    98350    Proceso_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Proceso_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Proceso_id_seq";
       public            	   wcarbajal    false    220    5            �           0    0    Proceso_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Proceso_id_seq" OWNED BY public."Proceso".id;
          public            	   wcarbajal    false    219            �            1259    98336    Roles    TABLE     P   CREATE TABLE public."Roles" (
    id integer NOT NULL,
    rol text NOT NULL
);
    DROP TABLE public."Roles";
       public         heap r    	   wcarbajal    false    5            �            1259    98335    Roles_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Roles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Roles_id_seq";
       public            	   wcarbajal    false    5    218            �           0    0    Roles_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Roles_id_seq" OWNED BY public."Roles".id;
          public            	   wcarbajal    false    217            �            1259    98321    Usuario    TABLE     7  CREATE TABLE public."Usuario" (
    id integer NOT NULL,
    nombre text DEFAULT 'John Doe'::text NOT NULL,
    correo text NOT NULL,
    password text NOT NULL,
    img text,
    estado boolean DEFAULT true,
    google boolean DEFAULT false,
    "rolesId" integer NOT NULL,
    online boolean DEFAULT false
);
    DROP TABLE public."Usuario";
       public         heap r    	   wcarbajal    false    5            �            1259    98382    _ProcesoResponsables    TABLE     c   CREATE TABLE public."_ProcesoResponsables" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);
 *   DROP TABLE public."_ProcesoResponsables";
       public         heap r    	   wcarbajal    false    5            �            1259    98306    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap r    	   wcarbajal    false    5            �            1259    98449 	   indicador    TABLE     K  CREATE TABLE public.indicador (
    id integer NOT NULL,
    nombre text NOT NULL,
    tipo text NOT NULL,
    justificacion text,
    formula text,
    "sentidoEsperado" text,
    "unidadMedida" text,
    frecuencia text,
    "fuenteDatos" text,
    "logrosEsperados" text,
    "lineaBase" text,
    "detalleProcesoId" integer
);
    DROP TABLE public.indicador;
       public         heap r    	   wcarbajal    false    5            �            1259    98448    indicador_id_seq    SEQUENCE     �   CREATE SEQUENCE public.indicador_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.indicador_id_seq;
       public            	   wcarbajal    false    5    235            �           0    0    indicador_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.indicador_id_seq OWNED BY public.indicador.id;
          public            	   wcarbajal    false    234            �            1259    98333    usuario_id_seq    SEQUENCE     w   CREATE SEQUENCE public.usuario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.usuario_id_seq;
       public            	   wcarbajal    false    5    215            �           0    0    usuario_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.usuario_id_seq OWNED BY public."Usuario".id;
          public            	   wcarbajal    false    216            �           2604    98443    Actividad id    DEFAULT     p   ALTER TABLE ONLY public."Actividad" ALTER COLUMN id SET DEFAULT nextval('public."Actividad_id_seq"'::regclass);
 =   ALTER TABLE public."Actividad" ALTER COLUMN id DROP DEFAULT;
       public            	   wcarbajal    false    233    232    233            �           2604    98408    DetalleProceso id    DEFAULT     z   ALTER TABLE ONLY public."DetalleProceso" ALTER COLUMN id SET DEFAULT nextval('public."DetalleProceso_id_seq"'::regclass);
 B   ALTER TABLE public."DetalleProceso" ALTER COLUMN id DROP DEFAULT;
       public            	   wcarbajal    false    225    224    225            �           2604    98417    Diagrama id    DEFAULT     n   ALTER TABLE ONLY public."Diagrama" ALTER COLUMN id SET DEFAULT nextval('public."Diagrama_id_seq"'::regclass);
 <   ALTER TABLE public."Diagrama" ALTER COLUMN id DROP DEFAULT;
       public            	   wcarbajal    false    227    226    227            �           2604    98377 	   Dueño id    DEFAULT     j   ALTER TABLE ONLY public."Dueño" ALTER COLUMN id SET DEFAULT nextval('public."Dueño_id_seq"'::regclass);
 :   ALTER TABLE public."Dueño" ALTER COLUMN id DROP DEFAULT;
       public            	   wcarbajal    false    221    222    222            �           2604    98427    Ficha id    DEFAULT     h   ALTER TABLE ONLY public."Ficha" ALTER COLUMN id SET DEFAULT nextval('public."Ficha_id_seq"'::regclass);
 9   ALTER TABLE public."Ficha" ALTER COLUMN id DROP DEFAULT;
       public            	   wcarbajal    false    229    228    229            �           2604    98436    Procedimiento id    DEFAULT     x   ALTER TABLE ONLY public."Procedimiento" ALTER COLUMN id SET DEFAULT nextval('public."Procedimiento_id_seq"'::regclass);
 A   ALTER TABLE public."Procedimiento" ALTER COLUMN id DROP DEFAULT;
       public            	   wcarbajal    false    231    230    231            �           2604    98354 
   Proceso id    DEFAULT     l   ALTER TABLE ONLY public."Proceso" ALTER COLUMN id SET DEFAULT nextval('public."Proceso_id_seq"'::regclass);
 ;   ALTER TABLE public."Proceso" ALTER COLUMN id DROP DEFAULT;
       public            	   wcarbajal    false    220    219    220            �           2604    98339    Roles id    DEFAULT     h   ALTER TABLE ONLY public."Roles" ALTER COLUMN id SET DEFAULT nextval('public."Roles_id_seq"'::regclass);
 9   ALTER TABLE public."Roles" ALTER COLUMN id DROP DEFAULT;
       public            	   wcarbajal    false    218    217    218            �           2604    98334 
   Usuario id    DEFAULT     j   ALTER TABLE ONLY public."Usuario" ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);
 ;   ALTER TABLE public."Usuario" ALTER COLUMN id DROP DEFAULT;
       public            	   wcarbajal    false    216    215            �           2604    98452    indicador id    DEFAULT     l   ALTER TABLE ONLY public.indicador ALTER COLUMN id SET DEFAULT nextval('public.indicador_id_seq'::regclass);
 ;   ALTER TABLE public.indicador ALTER COLUMN id DROP DEFAULT;
       public            	   wcarbajal    false    234    235    235            �          0    98440 	   Actividad 
   TABLE DATA           ^   COPY public."Actividad" (id, nombre, descripcion, responsable, "procedimientoId") FROM stdin;
    public            	   wcarbajal    false    233   h}       �          0    98405    DetalleProceso 
   TABLE DATA           v   COPY public."DetalleProceso" (id, procedimiento, indicadores, "diagramaId", "fichaId", "procedimientoId") FROM stdin;
    public            	   wcarbajal    false    225   �}       �          0    98414    Diagrama 
   TABLE DATA           J   COPY public."Diagrama" (id, url, "creadoEn", "actualizadoEn") FROM stdin;
    public            	   wcarbajal    false    227   �}       �          0    98374    Dueño 
   TABLE DATA           V   COPY public."Dueño" (id, oficina, director, "procesoId", siglas, correo) FROM stdin;
    public            	   wcarbajal    false    222   �}       �          0    98424    Ficha 
   TABLE DATA           �   COPY public."Ficha" (id, objetivo, "objetivoEstratégico", alcance, entradas, salidas, proveedores, clientes, riesgos, registros) FROM stdin;
    public            	   wcarbajal    false    229   ��       �          0    98433    Procedimiento 
   TABLE DATA           -   COPY public."Procedimiento" (id) FROM stdin;
    public            	   wcarbajal    false    231   ��       �          0    98351    Proceso 
   TABLE DATA           �   COPY public."Proceso" (id, nombre, descripcion, "parentId", "creadoEn", "actualizadoEn", codigo, nivel, tipo, estado, "detalleProcesoId") FROM stdin;
    public            	   wcarbajal    false    220   ɂ       �          0    98336    Roles 
   TABLE DATA           *   COPY public."Roles" (id, rol) FROM stdin;
    public            	   wcarbajal    false    218   ��       �          0    98321    Usuario 
   TABLE DATA           i   COPY public."Usuario" (id, nombre, correo, password, img, estado, google, "rolesId", online) FROM stdin;
    public            	   wcarbajal    false    215   ��       �          0    98382    _ProcesoResponsables 
   TABLE DATA           :   COPY public."_ProcesoResponsables" ("A", "B") FROM stdin;
    public            	   wcarbajal    false    223   /�       �          0    98306    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public            	   wcarbajal    false    214   L�       �          0    98449 	   indicador 
   TABLE DATA           �   COPY public.indicador (id, nombre, tipo, justificacion, formula, "sentidoEsperado", "unidadMedida", frecuencia, "fuenteDatos", "logrosEsperados", "lineaBase", "detalleProcesoId") FROM stdin;
    public            	   wcarbajal    false    235   s�       �           0    0    Actividad_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Actividad_id_seq"', 1, false);
          public            	   wcarbajal    false    232            �           0    0    DetalleProceso_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."DetalleProceso_id_seq"', 1, false);
          public            	   wcarbajal    false    224            �           0    0    Diagrama_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Diagrama_id_seq"', 1, false);
          public            	   wcarbajal    false    226            �           0    0    Dueño_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Dueño_id_seq"', 24, true);
          public            	   wcarbajal    false    221            �           0    0    Ficha_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Ficha_id_seq"', 1, false);
          public            	   wcarbajal    false    228            �           0    0    Procedimiento_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."Procedimiento_id_seq"', 1, false);
          public            	   wcarbajal    false    230            �           0    0    Proceso_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Proceso_id_seq"', 81, true);
          public            	   wcarbajal    false    219            �           0    0    Roles_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Roles_id_seq"', 2, true);
          public            	   wcarbajal    false    217            �           0    0    indicador_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.indicador_id_seq', 1, false);
          public            	   wcarbajal    false    234            �           0    0    usuario_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.usuario_id_seq', 1, true);
          public            	   wcarbajal    false    216            �           2606    98447    Actividad Actividad_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Actividad"
    ADD CONSTRAINT "Actividad_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Actividad" DROP CONSTRAINT "Actividad_pkey";
       public              	   wcarbajal    false    233            �           2606    98412 "   DetalleProceso DetalleProceso_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."DetalleProceso"
    ADD CONSTRAINT "DetalleProceso_pkey" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."DetalleProceso" DROP CONSTRAINT "DetalleProceso_pkey";
       public              	   wcarbajal    false    225            �           2606    98422    Diagrama Diagrama_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Diagrama"
    ADD CONSTRAINT "Diagrama_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Diagrama" DROP CONSTRAINT "Diagrama_pkey";
       public              	   wcarbajal    false    227            �           2606    98381    Dueño Dueño_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Dueño"
    ADD CONSTRAINT "Dueño_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Dueño" DROP CONSTRAINT "Dueño_pkey";
       public              	   wcarbajal    false    222            �           2606    98431    Ficha Ficha_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Ficha"
    ADD CONSTRAINT "Ficha_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Ficha" DROP CONSTRAINT "Ficha_pkey";
       public              	   wcarbajal    false    229            �           2606    98438     Procedimiento Procedimiento_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."Procedimiento"
    ADD CONSTRAINT "Procedimiento_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."Procedimiento" DROP CONSTRAINT "Procedimiento_pkey";
       public              	   wcarbajal    false    231            �           2606    98359    Proceso Proceso_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Proceso"
    ADD CONSTRAINT "Proceso_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Proceso" DROP CONSTRAINT "Proceso_pkey";
       public              	   wcarbajal    false    220            �           2606    98343    Roles Roles_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Roles" DROP CONSTRAINT "Roles_pkey";
       public              	   wcarbajal    false    218            �           2606    98331    Usuario Usuario_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Usuario" DROP CONSTRAINT "Usuario_pkey";
       public              	   wcarbajal    false    215            �           2606    98386 1   _ProcesoResponsables _ProcesoResponsables_AB_pkey 
   CONSTRAINT     y   ALTER TABLE ONLY public."_ProcesoResponsables"
    ADD CONSTRAINT "_ProcesoResponsables_AB_pkey" PRIMARY KEY ("A", "B");
 _   ALTER TABLE ONLY public."_ProcesoResponsables" DROP CONSTRAINT "_ProcesoResponsables_AB_pkey";
       public              	   wcarbajal    false    223    223            �           2606    98314 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public              	   wcarbajal    false    214            �           2606    98456    indicador indicador_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.indicador
    ADD CONSTRAINT indicador_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.indicador DROP CONSTRAINT indicador_pkey;
       public              	   wcarbajal    false    235            �           1259    98457    DetalleProceso_diagramaId_key    INDEX     k   CREATE UNIQUE INDEX "DetalleProceso_diagramaId_key" ON public."DetalleProceso" USING btree ("diagramaId");
 3   DROP INDEX public."DetalleProceso_diagramaId_key";
       public              	   wcarbajal    false    225            �           1259    98458    DetalleProceso_fichaId_key    INDEX     e   CREATE UNIQUE INDEX "DetalleProceso_fichaId_key" ON public."DetalleProceso" USING btree ("fichaId");
 0   DROP INDEX public."DetalleProceso_fichaId_key";
       public              	   wcarbajal    false    225            �           1259    98459 "   DetalleProceso_procedimientoId_key    INDEX     u   CREATE UNIQUE INDEX "DetalleProceso_procedimientoId_key" ON public."DetalleProceso" USING btree ("procedimientoId");
 8   DROP INDEX public."DetalleProceso_procedimientoId_key";
       public              	   wcarbajal    false    225            �           1259    98365    Proceso_codigo_key    INDEX     S   CREATE UNIQUE INDEX "Proceso_codigo_key" ON public."Proceso" USING btree (codigo);
 (   DROP INDEX public."Proceso_codigo_key";
       public              	   wcarbajal    false    220            �           1259    98460    Proceso_detalleProcesoId_key    INDEX     i   CREATE UNIQUE INDEX "Proceso_detalleProcesoId_key" ON public."Proceso" USING btree ("detalleProcesoId");
 2   DROP INDEX public."Proceso_detalleProcesoId_key";
       public              	   wcarbajal    false    220            �           1259    98332    Usuario_correo_key    INDEX     S   CREATE UNIQUE INDEX "Usuario_correo_key" ON public."Usuario" USING btree (correo);
 (   DROP INDEX public."Usuario_correo_key";
       public              	   wcarbajal    false    215            �           1259    98387    _ProcesoResponsables_B_index    INDEX     `   CREATE INDEX "_ProcesoResponsables_B_index" ON public."_ProcesoResponsables" USING btree ("B");
 2   DROP INDEX public."_ProcesoResponsables_B_index";
       public              	   wcarbajal    false    223            �           2606    98481 (   Actividad Actividad_procedimientoId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Actividad"
    ADD CONSTRAINT "Actividad_procedimientoId_fkey" FOREIGN KEY ("procedimientoId") REFERENCES public."Procedimiento"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 V   ALTER TABLE ONLY public."Actividad" DROP CONSTRAINT "Actividad_procedimientoId_fkey";
       public            	   wcarbajal    false    233    231    3300            �           2606    98466 -   DetalleProceso DetalleProceso_diagramaId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."DetalleProceso"
    ADD CONSTRAINT "DetalleProceso_diagramaId_fkey" FOREIGN KEY ("diagramaId") REFERENCES public."Diagrama"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 [   ALTER TABLE ONLY public."DetalleProceso" DROP CONSTRAINT "DetalleProceso_diagramaId_fkey";
       public            	   wcarbajal    false    3296    225    227            �           2606    98471 *   DetalleProceso DetalleProceso_fichaId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."DetalleProceso"
    ADD CONSTRAINT "DetalleProceso_fichaId_fkey" FOREIGN KEY ("fichaId") REFERENCES public."Ficha"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 X   ALTER TABLE ONLY public."DetalleProceso" DROP CONSTRAINT "DetalleProceso_fichaId_fkey";
       public            	   wcarbajal    false    3298    225    229            �           2606    98476 2   DetalleProceso DetalleProceso_procedimientoId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."DetalleProceso"
    ADD CONSTRAINT "DetalleProceso_procedimientoId_fkey" FOREIGN KEY ("procedimientoId") REFERENCES public."Procedimiento"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 `   ALTER TABLE ONLY public."DetalleProceso" DROP CONSTRAINT "DetalleProceso_procedimientoId_fkey";
       public            	   wcarbajal    false    225    3300    231            �           2606    98388    Dueño Dueño_procesoId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Dueño"
    ADD CONSTRAINT "Dueño_procesoId_fkey" FOREIGN KEY ("procesoId") REFERENCES public."Proceso"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 J   ALTER TABLE ONLY public."Dueño" DROP CONSTRAINT "Dueño_procesoId_fkey";
       public            	   wcarbajal    false    220    222    3284            �           2606    98461 %   Proceso Proceso_detalleProcesoId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Proceso"
    ADD CONSTRAINT "Proceso_detalleProcesoId_fkey" FOREIGN KEY ("detalleProcesoId") REFERENCES public."DetalleProceso"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 S   ALTER TABLE ONLY public."Proceso" DROP CONSTRAINT "Proceso_detalleProcesoId_fkey";
       public            	   wcarbajal    false    220    225    3293            �           2606    98360    Proceso Proceso_parentId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Proceso"
    ADD CONSTRAINT "Proceso_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."Proceso"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 K   ALTER TABLE ONLY public."Proceso" DROP CONSTRAINT "Proceso_parentId_fkey";
       public            	   wcarbajal    false    3284    220    220            �           2606    98344    Usuario Usuario_rolesId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT "Usuario_rolesId_fkey" FOREIGN KEY ("rolesId") REFERENCES public."Roles"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 J   ALTER TABLE ONLY public."Usuario" DROP CONSTRAINT "Usuario_rolesId_fkey";
       public            	   wcarbajal    false    218    3280    215            �           2606    98393 0   _ProcesoResponsables _ProcesoResponsables_A_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_ProcesoResponsables"
    ADD CONSTRAINT "_ProcesoResponsables_A_fkey" FOREIGN KEY ("A") REFERENCES public."Proceso"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public."_ProcesoResponsables" DROP CONSTRAINT "_ProcesoResponsables_A_fkey";
       public            	   wcarbajal    false    220    223    3284            �           2606    98398 0   _ProcesoResponsables _ProcesoResponsables_B_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_ProcesoResponsables"
    ADD CONSTRAINT "_ProcesoResponsables_B_fkey" FOREIGN KEY ("B") REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public."_ProcesoResponsables" DROP CONSTRAINT "_ProcesoResponsables_B_fkey";
       public            	   wcarbajal    false    3278    215    223            �           2606    98486 )   indicador indicador_detalleProcesoId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.indicador
    ADD CONSTRAINT "indicador_detalleProcesoId_fkey" FOREIGN KEY ("detalleProcesoId") REFERENCES public."DetalleProceso"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 U   ALTER TABLE ONLY public.indicador DROP CONSTRAINT "indicador_detalleProcesoId_fkey";
       public            	   wcarbajal    false    235    225    3293            �      x������ � �      �      x������ � �      �      x������ � �      �   �  x��V�r�6<�_�/`����P�,�eY�$�*���H��P"���{�C*�\�ci ��6Sً$�GhL�L��l,�(
y�[�ɽ(\+w�R%�$]Z�i%>�Tܙ?dq`�o�x��'���MQ$[�Ijq��-��Bj��i#c�߈_9|�� ���,��)~)�>>�Rx~�jE�X�W��1�`���M�$W�UR���=ϭh\�D�6&�
~E;),	�Z���JjU��҇$���e�Z�T��aW�n�v��7���hK��Ʒ�uz��}L�=<��]o�)��<P,�(�S$���J�Þ����7��G��5A��������<h�Y��gѓgNV
�|u�$�9���Z�QM-�L�Vuq�����z�O�֕�4|e��A����g��	�kHJ��Ҡ���_�8�!�bE��fLx�Q��'�V$UR����6++�e�
F���>�+�D[��|�$P)c�?Xl�&��$���XftK��z��(��N)}N�(!�%˒�7!�,˃���C��W=����7d�DM��[Q3����@���{�Y����w?��n�iqή��f#l2�s����;ac�̆��"8��uo���.�Ѩ|WT�����IP)�O�TJh�������>&�FpH�l�3S9�=�-�:-fZ�ίB��>��[�sa�>�Ȗ3�:��6d|�g<�����e�U�t��6#�����e���2`J9*E[���KV�������ݳ�n�����1d�AkҾ����36�� 2��g`�
�e1�4�?�y�0�0<���֢�F�-8�Οf���U7��=Ǩ�y�h��:漞1���!݇�e�B�@iЧ�c�? ��Xv�F��� �"<d��Л�3�	TqO����]>�~�2{\�xO�L�ɊQ���CC�OC��o��i�jaw��Nh.���q��q��#q����k�Q���튩��81û��������R�����ް�u(�T����ʇ���g��c�=�!���$]����hT����������C�u��4� ��:d{�#i3W��dk9��GX����V�FI�;Dɖ:��]`�bĐ��US\@5�:�s��Έ�D��AFx�ɲ����a ^fp>���6��0Y�u;1���=<��GɌ�%�4>���# @�u�gxű��B�4���t��M̝�:o(��ȺX�d3�]�$�����srvv�/x�2      �      x������ � �      �      x������ � �      �   �  x��ZM��^kN�e�$�%J��n���c�U6l��aCJ22Ye�Sd9�,��o�N򊒬�$��z�&���U��#]�{����̎�-YT�\���2����'���^��b��ڮ�	�!N��&�������(d����Ƴ�����4j%v!�}33�gǅe��z�s���P�;��W�����W�?o�Ϸ�2-�ކiV�D1�1�����7C���QcQ)�X1cyO$v&�Hd�x�Xf+x��=K�w��;��q�3������*sf�PϞ�祵M蓐Tڟlz��	��]>�33�!w����6*�R��_�#������Y$$�42��!)'�r���Fj����g�]�YBm>@qavm� `��Eꀀ*ho�S�܌76׳��:d1:h��K@�q�ڥS6�Mo��ל���y�P������ ��"8Ov3#��+JI��}`ű�r?�q�O�&L� _C���	�xQƊI$�>6v_����S��SOS11zo�x��\��fYVH��7Q��o�B�����{�޳_߅��~�4˟�T�h޳����//܃(@�\��	)�|��`��Q�3�ܚ��ƉFU���'To�sL��y�Բ����i�+S@�͹������Y�XcD!m�I�K�+;�_^�����Y�e��İ7��(P H&F��<��R�}U�@p�r&'�5 .��ҝS�^��p#�k���9����u�$0��ڟ(��Lc�_U`.9�'('dUi$������~�}�o1��t#6��>�.?ֲ����?pώ�咅:��:u�O��.��,��J�*�~�&�5���-�������a�o�G��5$����#���R�2>hT��n�_�YN%�D@0������,1r��e$�v	��3�zi8��]AB�L��Uk$T)̳�i�Oy)/^?W���X�[M��4�4�ts[���:Gڻw;驈���{�b#_Y��g�=�Ϛ���d�u~�oG�\��g �"ؖ).�QK� �����ғ�Z�"��
n`x����=k{�I9c���ͭ%��挡r�y��OO��>Ԟ��αU�>L����7E�}�X{v(�/��CHw�ߠ���sp�9.t��p`�,�"2ǅ-i��G"=�,ojι)���!�_u쨌%I����<kz�7�L��;���#���qwr�Xq��Cb	E��\Cc�	�`�]�%�&@u�FU3��z=���]e�uE˦֐���p���(��w��E?���H��Vm�k(ʨ���9�J��g39�^��Q�pv��hBSQo=;�LY�Yzz�2s��c~�����PJ8�2)pRqs��W����M
�� vP�$Mk_���|q>0���X�	��q����*%S��9=d&#Q@��&bs�X��a��	�ja��Y\�5�A���+(9|�r���.SF�^P�u�d��;Ԓ�ra���c�ƅYs$�Rz1�U�׿�o ��҂�L���q��!t,U&�]��<�G�>U�H~�9F�f��;�ʤ��� ���0t�������d:!nx��K�9��<4z�Ti�.A��A5�O=���"s���]�X�PG��o�6G�ϑ�֤e��T�ˊ�N��Za����Yi�I���Mġ�#����t�������,뛈�qb�[�������N�H%E�o[9���?�UyX`���G��o�U����zN���ژ�G���E��;��Ӛ�'�=4>�)�nH�x$���Z�>����+��Ur9n�p�B0>��� C�{$�7쵈B9��V�B6O��-7d�Hh��G#z㙩�"����4f'k��u�'ƐV��(=o��m������2e/aϊр�g�ԞU .���!�?���޸���"nǷ������j�A�S���5��I�ԯ��T�c��N�_�D�/������-A�������� r��;���D�Y,6���4o����x�cϣڗ��(�&L�Ⱥg�5�12������=���r5T�y��s�S��6;�>X:$XN��	� ��g"�׿k;�^/6?��,K������Y:�ڝ���VZ9D�
�/�|�[�^�F�.��`:B��(���#Kk���ү�T���ch&&^�R}�'Q�c@}Y>0�ޚ1�$p�����C�/Λ7o���      �      x�3�tt����2�v����� +��      �   q   x�3�tL����,.)JL�/�L�RRs����s9U��TT�r�B�sr
�S�|r��K,J#J�*�<�,ʒ�3��C,�|=��*s�L��K39c�8K8�89K�b���� ��"�      �      x������ � �      �     x���]nc7���U��P@R")e]� %RE�4�d����fn
�����s�d�s�,P4-��/�
.�4�}s�57�����̮�u�v5�=P�jc	J�q-$�!�a�C��ct���ނ� !�8�����b�!?����VW�].�xCB�Ѽ4�Uڌ�.eLCVa�w��a��>��0��{�wT���]L��ó
��.��~F�f�h�G{}9�?������;�q)�w���C��[i��B%�yն�>ȩ�Elkr4��u0L�#(V�>u�R��P�nmo\n׻�ZI��`�m����K�Oq����S�`$,�Ւ"v��X����~�-1L�ߚ����m_�uiTEa�nl2ֶEA��P�٦�y��,_A�2a��8=>�?~+3u�X���ܰ�=!w�:��$
b���(�|��;#&�d�:�I[��h͙\�p���(Mڤ+�B]�s��.Fg�1�+��^�9���|Zq>}+��C� ���%MJcX�/��f�a�ik=���Zk�H�ˆ���#]���=�4\;��TJ��_i����$�i���,��C���BH/,���7��[\f3k#�!��N���;U���A6����\������J����͇��z���_;�K��������r�t:>����x����z\F�>��\5Cf�u�&�<l���Q��zh���q�9׊> Ф&a����jD���2w�I���p��f����_�j*2�v+�/�����%��v�k��1�DO���b�rQl��{��'�+�n�C�L�2+}��Y�+{��ޙ����!3����j�ܾ؝�$3���Q��C���nI��Q�w"�b��K��4����Ծd����2�v�2�Iއ�.����'a���F��#Yy2=m�����q�Ƈ�/]и�tKz�_���Jo���|����]%�������rf:��Z--���P-��g��s��*��Z���ؼg��ꩡjP:��䴤uu��1�Ϻ�/]�q��_�~&�������s��!��F��#�~�����5e#j      �      x������ � �     