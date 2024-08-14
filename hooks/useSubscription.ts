"use client";

import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { collection, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

const PRO_LIMIT = 20;
const FREE_LIMIT = 2;

function useSubscription() {
  const [hasActiveMembership, setHasActiveMembership] = useState(null);
  const [isOverFileLimit, setIsOverFileLimit] = useState(false);
  const { user } = useUser();

  //   Listen to the user document
  const [snapshot, loading, error] = useDocument(
    user && doc(db, "users", user.id),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  //   Listen to the users file collection
  const [filesSnapshot, filesLoading] = useCollection(
    user && collection(db, "users", user?.id, "files")
  );

  useEffect(() => {
    if (!snapshot) return;

    const data = snapshot.data()
    if(!data) return

    setHasActiveMembership(data.hasActiveMembership)


  }, [snapshot]);

  useEffect(()=>{
    if(!filesSnapshot || hasActiveMembership === null) return

    const files = filesSnapshot.docs
    const usersLimit = hasActiveMembership ? PRO_LIMIT : FREE_LIMIT

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesSnapshot, hasActiveMembership, PRO_LIMIT, FREE_LIMIT])

}

export default useSubscription;
