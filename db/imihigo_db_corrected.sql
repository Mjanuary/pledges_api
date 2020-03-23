CREATE TABLE "tbl_province" (
	"province_id" integer NOT NULL,
	"province_name" VARCHAR NOT NULL,
	"geo_location" jsonb,
	"state" BOOLEAN NOT NULL DEFAULT '1',
	CONSTRAINT "tbl_province_pk" PRIMARY KEY ("province_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "tbl_district" (
	"district_id" integer NOT NULL,
	"province_id" integer NOT NULL,
	"district_name" varchar NOT NULL,
	"system_access" BOOLEAN NOT NULL DEFAULT '1',
	"geo_location" jsonb,
	CONSTRAINT "tbl_district_pk" PRIMARY KEY ("district_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "tbl_sector" (
	"sector_id" integer NOT NULL,
	"sector_name" varchar NOT NULL,
	"district_id" integer NOT NULL,
	"geo_location" jsonb,
	"status" BOOLEAN NOT NULL DEFAULT '1',
	CONSTRAINT "tbl_sector_pk" PRIMARY KEY ("sector_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "tbl_cell" (
	"cell_id" integer NOT NULL,
	"cell_code" varchar NOT NULL UNIQUE,
	"cell_name" varchar NOT NULL,
	"sector_id" integer NOT NULL,
	"status" BOOLEAN NOT NULL DEFAULT '1',
	CONSTRAINT "tbl_cell_pk" PRIMARY KEY ("cell_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "pillars" (
	"pillar_id" varchar NOT NULL UNIQUE,
	"pillar_title" varchar NOT NULL UNIQUE,
	"description" TEXT,
	"status" BOOLEAN NOT NULL DEFAULT '1',
	CONSTRAINT "pillars_pk" PRIMARY KEY ("pillar_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sector" (
	"sector_id" varchar NOT NULL UNIQUE,
	"pillar_id" varchar NOT NULL,
	"sector_title" TEXT NOT NULL,
	"sector_description" TEXT,
	"status" BOOLEAN NOT NULL DEFAULT '1',
	CONSTRAINT "sector_pk" PRIMARY KEY ("sector_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "outcome" (
	"outcome_id" varchar NOT NULL UNIQUE,
	"sector_id" varchar NOT NULL UNIQUE,
	"outcome_title" TEXT NOT NULL,
	"outcome_description" TEXT,
	"status" BOOLEAN NOT NULL DEFAULT '1',
	"district_id" integer,
	CONSTRAINT "outcome_pk" PRIMARY KEY ("outcome_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "output" (
	"output_id" varchar NOT NULL,
	"outcome_id" varchar NOT NULL,
	"output_title" TEXT NOT NULL,
	"output_description" TEXT,
	"status" BOOLEAN NOT NULL DEFAULT '1',
	CONSTRAINT "output_pk" PRIMARY KEY ("output_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "indicator" (
	"indicator_id" varchar NOT NULL,
	"accademic_id" integer NOT NULL,
	"indicator_title" VARCHAR NOT NULL,
	"indicator_description" TEXT,
	"status" BOOLEAN NOT NULL DEFAULT '1',
	CONSTRAINT "indicator_pk" PRIMARY KEY ("indicator_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "accademic_year" (
	"accademic_id" serial NOT NULL,
	"accademic_title" varchar NOT NULL UNIQUE,
	"start_date" DATE NOT NULL,
	"end_date" DATE NOT NULL,
	"registered_date" DATE NOT NULL,
	"status" BOOLEAN NOT NULL DEFAULT '1',
	CONSTRAINT "accademic_year_pk" PRIMARY KEY ("accademic_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "plan" (
	"plan_id" varchar NOT NULL,
	"indicator_id" varchar NOT NULL,
	"district_id" integer NOT NULL,
	"cell_id" integer NOT NULL,
	"status" BOOLEAN NOT NULL DEFAULT '1',
	"geo_location" jsonb,
	"initial_data" jsonb,
	"value_types" jsonb,
	"baseline" jsonb,
	"targets" jsonb,
	"budget" jsonb,
	CONSTRAINT "plan_pk" PRIMARY KEY ("plan_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users" (
	"user_id" varchar NOT NULL,
	"nid" varchar NOT NULL UNIQUE,
	"email" varchar NOT NULL UNIQUE,
	"username" varchar NOT NULL,
	"names" varchar NOT NULL,
	"profile" varchar NOT NULL,
	"dob" DATE NOT NULL,
	"password" varchar NOT NULL DEFAULT 'null',
	"phone_number" varchar NOT NULL UNIQUE,
	"status" BOOLEAN NOT NULL DEFAULT '1',
	"details" jsonb,
	CONSTRAINT "users_pk" PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user_privilege" (
	"up_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"type_id" varchar NOT NULL,
	"role_temporary" BOOLEAN NOT NULL DEFAULT '1',
	"action_type" varchar NOT NULL,
	"action_id" varchar NOT NULL,
	"accademic_id" integer,
	"level_type" VARCHAR NOT NULL,
	"level_id" VARCHAR NOT NULL,
	"status" BOOLEAN NOT NULL DEFAULT '1',
	"custom_rules" jsonb,
	CONSTRAINT "user_privilege_pk" PRIMARY KEY ("up_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users_types" (
	"type_id" varchar NOT NULL,
	"type_title" varchar NOT NULL,
	"status" BOOLEAN NOT NULL DEFAULT '1',
	"rules" jsonb,
	CONSTRAINT "users_types_pk" PRIMARY KEY ("type_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "target_millestone" (
	"target_id" VARCHAR NOT NULL,
	"plan_id" VARCHAR NOT NULL,
	"user_id" varchar NOT NULL,
	"date" DATE NOT NULL,
	"geo_location" TEXT NOT NULL,
	"description" TEXT,
	"status" BOOLEAN NOT NULL DEFAULT '1',
	"evaluations" jsonb,
	"progress_values" jsonb,
	"used_budget" jsonb,
	"media" jsonb,
	CONSTRAINT "target_millestone_pk" PRIMARY KEY ("target_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "json_schema" (
	"id" serial NOT NULL,
	"schema_name" serial NOT NULL,
	"schema" jsonb,
	"comment" TEXT,
	CONSTRAINT "json_schema_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "task" (
	"task_id" varchar NOT NULL,
	"task_name" varchar NOT NULL,
	"description" TEXT NOT NULL,
	"start_date" DATE NOT NULL,
	"end_date" DATE NOT NULL,
	"action_type" varchar NOT NULL,
	"action_id" varchar NOT NULL,
	"level_type" varchar NOT NULL,
	"level_id" varchar NOT NULL,
	"status" BOOLEAN NOT NULL DEFAULT '1',
	CONSTRAINT "task_pk" PRIMARY KEY ("task_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "drafts" (
	"draft_id" varchar NOT NULL,
	"plan_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"state" varchar(20) NOT NULL,
	"status" BOOLEAN NOT NULL DEFAULT '1',
	"data" jsonb,
	CONSTRAINT "drafts_pk" PRIMARY KEY ("draft_id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "tbl_district" ADD CONSTRAINT "tbl_district_fk0" FOREIGN KEY ("province_id") REFERENCES "tbl_province"("province_id");

ALTER TABLE "tbl_sector" ADD CONSTRAINT "tbl_sector_fk0" FOREIGN KEY ("district_id") REFERENCES "tbl_district"("district_id");

ALTER TABLE "tbl_cell" ADD CONSTRAINT "tbl_cell_fk0" FOREIGN KEY ("sector_id") REFERENCES "tbl_sector"("sector_id");


ALTER TABLE "sector" ADD CONSTRAINT "sector_fk0" FOREIGN KEY ("pillar_id") REFERENCES "pillars"("pillar_id");

ALTER TABLE "outcome" ADD CONSTRAINT "outcome_fk0" FOREIGN KEY ("sector_id") REFERENCES "sector"("sector_id");
ALTER TABLE "outcome" ADD CONSTRAINT "outcome_fk1" FOREIGN KEY ("district_id") REFERENCES "tbl_district"("district_id");

ALTER TABLE "output" ADD CONSTRAINT "output_fk0" FOREIGN KEY ("outcome_id") REFERENCES "outcome"("outcome_id");

ALTER TABLE "indicator" ADD CONSTRAINT "indicator_fk0" FOREIGN KEY ("accademic_id") REFERENCES "accademic_year"("accademic_id");


ALTER TABLE "plan" ADD CONSTRAINT "plan_fk0" FOREIGN KEY ("indicator_id") REFERENCES "indicator"("indicator_id");
ALTER TABLE "plan" ADD CONSTRAINT "plan_fk1" FOREIGN KEY ("district_id") REFERENCES "tbl_district"("district_id");
ALTER TABLE "plan" ADD CONSTRAINT "plan_fk2" FOREIGN KEY ("cell_id") REFERENCES "tbl_cell"("cell_id");


-- ALTER TABLE user_privilege ALTER COLUMN user_id TYPE VARCHAR;
-- ALTER TABLE user_privilege ALTER COLUMN type_id TYPE VARCHAR;
-- ALTER TABLE user_privilege ALTER COLUMN accademic_id TYPE integer USING (accademic_id::integer);


ALTER TABLE "user_privilege" ADD CONSTRAINT "user_privilege_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");
ALTER TABLE "user_privilege" ADD CONSTRAINT "user_privilege_fk1" FOREIGN KEY ("type_id") REFERENCES "users_types"("type_id");
ALTER TABLE "user_privilege" ADD CONSTRAINT "user_privilege_fk2" FOREIGN KEY ("accademic_id") REFERENCES "accademic_year"("accademic_id");





ALTER TABLE "target_millestone" ADD CONSTRAINT "target_millestone_fk0" FOREIGN KEY ("plan_id") REFERENCES "plan"("plan_id");
ALTER TABLE "target_millestone" ADD CONSTRAINT "target_millestone_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");



ALTER TABLE "drafts" ADD CONSTRAINT "drafts_fk0" FOREIGN KEY ("plan_id") REFERENCES "plan"("plan_id");
ALTER TABLE "drafts" ADD CONSTRAINT "drafts_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");

