import { ThinContainer } from "@/components/layout/ThinContainer";
import { Heading1, Paragraph } from "@/components/utils/Text";
import { SubPageLayout } from "@/pages/layouts/SubPageLayout";
import { ConfigValuesPart } from "@/pages/parts/admin/ConfigValuesPart";
import { TMDBTestPart } from "@/pages/parts/admin/TMDBTestPart";
import { WorkerTestPart } from "@/pages/parts/admin/WorkerTestPart";

import { BackendTestPart } from "../parts/admin/BackendTestPart";

export function AdminPage() {
  return (
    <SubPageLayout>
      <ThinContainer>
        <Heading1>Admin tools</Heading1>
        <p className="text-muted-foreground">
          Silly tools used test sudo-flix! ૮₍´˶• . • ⑅ ₎ა
        </p>

        <div className="flex flex-col gap-4">
          <ConfigValuesPart />
          <BackendTestPart />
          <WorkerTestPart />
          <TMDBTestPart />
        </div>
      </ThinContainer>
    </SubPageLayout>
  );
}
