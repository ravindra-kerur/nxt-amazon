"use client";

import useBrowseingHistory from "@/hooks/use-browsing-history";
import { useEffect } from "react";

const AddToBrowsingHistory = ({
  id,
  category,
}: {
  id: string;
  category: string;
}) => {
  const { addItems } = useBrowseingHistory();
  useEffect(() => {
    addItems({ id, category });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

export default AddToBrowsingHistory;
