import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

export const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [search, setSearch] = useSearchParams();
  const {user} = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowLogin(true);
    }
  }, [search]);

  const handleOverlyClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowLogin(false);
      setSearch({});
    }
  };

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link>
          <img src="../../public/logo (1).png" alt="logo" className="h-20" />
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            <Button variant="outline" onClick={() => setShowLogin(true)}>
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            { user?.unsafeMetadata?.role === 'recruiter' &&
              <Link to="/post-job">
              <Button variant="destructive" className="rounded-full">
                <PenBox className="mr-2" />
                Post a job
              </Button>
            </Link>}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
      {showLogin && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-opacity-50"
          onClick={handleOverlyClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};
