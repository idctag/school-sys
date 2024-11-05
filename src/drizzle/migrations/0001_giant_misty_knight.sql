ALTER TABLE "session" RENAME COLUMN "role" TO "userRole";--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "session_role_user_role_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userRole_user_role_fk" FOREIGN KEY ("userRole") REFERENCES "public"."user"("role") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
