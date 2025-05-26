import { LogOut, User2 } from "lucide-react";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = false;
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between p-4 mx-auto max-w-7xl">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-red-500">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12 font-semibold ">
          <ul className="font-medium flex items-center gap-4">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>

          {!user ? (
            <div>
              <div className="flex items-center gap-4">
                <Link to={"/login"}>
                  <Button
                    variant="outline"
                    className="cursor-pointer border-red-300 hover:bg-red-500 hover:text-white"
                  >
                    Login
                  </Button>
                </Link>
                <Link to={"/register"}>
                  <Button className=" cursor-pointer bg-blue-500 hover:bg-blue-700">
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger className="cursor-pointer">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex items-center gap-4 space-y-2">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <div>
                    <h1 className="font-medium text-sm">User Name</h1>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum, dolor sit amet
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-0  ">
                  <div className="flex items-center ">
                    <User2 />
                    <Button variant="link">View Profile</Button>
                  </div>
                  <div className="flex items-center ">
                    <LogOut />
                    <Button variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
