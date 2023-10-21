"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import axios from "axios";
import { Progress } from "./ui/progress";
import { Skeleton } from "./ui/skeleton";
import { CopyIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "./ui/input";
import MediaLibrary from "@/context/mediaLibrary";
import useSWRMutation from "swr/mutation";
import { getImages } from "@/lib/dataservices";

type Props = {};

const UploadImages = (props: Props) => {
  const { media, addMedia } = MediaLibrary.useContainer();
  const [images, setImages] = useState({});
  const [searchImage, setSearchImage] = useState([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const { trigger, isMutating } = useSWRMutation("/api/images", getImages);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>): void {
    const fileList = e.target.files;
    if (fileList) {
      const files: File[] = Array.from(fileList);
      let tempimages = {};
      let sourceOrder = {};
      for (let i = 0; i < files.length; ++i) {
        tempimages[files[i].name] = { name: files[i].name };
        sourceOrder[files[i].name] = i;
      }
      setImages(tempimages);
      Promise.all(
        files.map((file) => {
          const formData = new FormData();
          formData.append("file", file!);
          formData.append("folder", "bb-poc/images");
          formData.append("upload_preset", "" + "u5yrn1d9-bb-poc");
          return axios.request({
            method: "post",
            url: "https://api.cloudinary.com/v1_1/hypermona/image/upload/",
            data: formData,
            onUploadProgress: (p) => {
              setImages((prev) => ({
                ...prev,
                [file.name]: { ...prev[file.name], progress: p.loaded / p.total! },
              }));
            },
          });
        })
      ).then((data) => {
        let imgs: string[] = [];
        Object.entries(sourceOrder);
        Object.entries(sourceOrder).forEach(([key, value]: any) => {
          imgs.push(data[value].data?.secure_url);
        });
        addMedia(imgs);
        setImages({});
      });
    }
  }
  const handleSearch = async () => {
    const searchValue = searchInputRef.current?.value;
    if (searchValue) {
      trigger(searchValue).then((data) => {
        console.log(data);
        setSearchImage(data);
      });
    }
  };
  async function handleCopy(url: any): Promise<void> {
    await navigator.clipboard.writeText(url);
    toast({
      description: "Successfuly copied Image Link",
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="mr-2">
          Open Media
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Media Library</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="upload" className="w-[460px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="search">Search</TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Image Library</CardTitle>
              </CardHeader>
              <CardContent>
                <label htmlFor="library-images">
                  <input
                    multiple
                    type="file"
                    name="library-images"
                    id="library-images"
                    hidden
                    onChange={handleFileChange}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      document.getElementById("library-images")?.click();
                    }}
                  >
                    Upload
                  </Button>
                </label>
              </CardContent>
            </Card>
            <Card className="overflow-y-auto h-[60vh] mt-1">
              <CardContent className="flex flex-wrap m-auto overflow-y-auto">
                {media?.map((image, i) => (
                  <div key={i} className="relative w-[190px] m-1 ">
                    <Button
                      className="absolute right-0"
                      variant="outline"
                      size="icon"
                      onClick={() => image}
                    >
                      <CopyIcon className="h-4 w-4" />
                    </Button>
                    <Image
                      src={image}
                      className="rounded-md"
                      width={190}
                      height={100}
                      alt="images"
                    />
                  </div>
                ))}

                {Object.entries(images)?.map(([key, value]: any, index) => (
                  <div key={key} className="w-[190px] m-1 overflow-y-auto relative">
                    <Skeleton className="w-[100%] h-[100px]" />
                    <div className="absolute top-[30px] text-center left-[20px] w-[80%]">
                      <p>{Number.isNaN(value?.progress * 100) ? 0 : value?.progress * 100}%</p>
                      <Progress value={value?.progress * 100} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="search">
            <Card>
              <CardHeader>
                <CardTitle>search</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Keywords...."
                    name="searchMedia"
                  />
                  <Button onClick={handleSearch} disabled={isMutating}>
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-y-auto h-[60vh] mt-1">
              <CardContent className="flex flex-wrap m-auto overflow-y-auto">
                {isMutating && <p className="text-center w-full mt-3">Searching...</p>}
                {searchImage?.length <= 0 && (
                  <p className="text-center w-full mt-3">No search result</p>
                )}
                {searchImage?.map((image: any, i) => (
                  <div key={image?.public_id} className="relative w-[190px] m-1 ">
                    <Button
                      className="absolute right-0"
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopy(image.secure_url)}
                    >
                      <CopyIcon className="h-4 w-4" />
                    </Button>
                    <Image
                      src={image?.secure_url}
                      className="rounded-md"
                      width={190}
                      height={100}
                      alt="images"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UploadImages;
