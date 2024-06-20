"use client";

import { useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import '../../assets/style/loading.css';

export default function playwrightTest() {
    const router = useRouter();
    const [showLoading, setShowLoading] = useState(true);

    const waitingForRunAutoTest: Function = async () => {
      await fetch('/api');
      setShowLoading(false);
      router.push("/playwright-report/index.html");
    }


    useEffect(() => {
      waitingForRunAutoTest();
    }, []);
    

    return (
      <div>
        {showLoading && (
          <div className="pl">
            <div className="pl__bars">
              <div className="pl__bar">
                <div className="pl__bar-s" />
                <div className="pl__bar-t" />
                <div className="pl__bar-l" />
                <div className="pl__bar-r" />
              </div>
              <div className="pl__bar">
                <div className="pl__bar-s" />
                <div className="pl__bar-t" />
                <div className="pl__bar-l" />
                <div className="pl__bar-r" />
              </div>
              <div className="pl__bar">
                <div className="pl__bar-s" />
                <div className="pl__bar-t" />
                <div className="pl__bar-l" />
                <div className="pl__bar-r" />
              </div>
              <div className="pl__bar">
                <div className="pl__bar-s" />
                <div className="pl__bar-t" />
                <div className="pl__bar-l" />
                <div className="pl__bar-r" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
}