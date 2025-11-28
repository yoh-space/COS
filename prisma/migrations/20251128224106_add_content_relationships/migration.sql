-- Add foreign key constraints for ContentVersion relationships
ALTER TABLE "ContentVersion" ADD CONSTRAINT "ContentVersion_blogPost_fkey" FOREIGN KEY ("contentId") REFERENCES "BlogPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ContentVersion" ADD CONSTRAINT "ContentVersion_deanMessage_fkey" FOREIGN KEY ("contentId") REFERENCES "DeanMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ContentVersion" ADD CONSTRAINT "ContentVersion_visionMission_fkey" FOREIGN KEY ("contentId") REFERENCES "VisionMission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key constraints for AuditLog relationships
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_blogPost_fkey" FOREIGN KEY ("entityId") REFERENCES "BlogPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_resource_fkey" FOREIGN KEY ("entityId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_staffMember_fkey" FOREIGN KEY ("entityId") REFERENCES "StaffMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_department_fkey" FOREIGN KEY ("entityId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_deanMessage_fkey" FOREIGN KEY ("entityId") REFERENCES "DeanMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_visionMission_fkey" FOREIGN KEY ("entityId") REFERENCES "VisionMission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_adminPosition_fkey" FOREIGN KEY ("entityId") REFERENCES "AdministrativePosition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_academicSection_fkey" FOREIGN KEY ("entityId") REFERENCES "AcademicSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_service_fkey" FOREIGN KEY ("entityId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
