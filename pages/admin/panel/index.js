import PanelLayout from "@/components/admin/PanelLayout";
import withAuth from "@/components/admin/withAuth";

const Panel = () => {
  return (
    <>
      <PanelLayout />
    </>
  );
};

export default withAuth(Panel);
