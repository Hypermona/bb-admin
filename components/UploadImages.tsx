"use client"
import React, { ChangeEvent, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button';
import Image from "next/image";
import axios from 'axios';
import { Progress } from './ui/progress';
import { Skeleton } from './ui/skeleton';
import { CopyIcon } from '@radix-ui/react-icons';
import { useToast } from "@/components/ui/use-toast";

type Props = {}

const UploadImages = (props: Props) => {
    const [images,setImages] = useState({})
    const { toast } = useToast();
    function handleFileChange(e: ChangeEvent<HTMLInputElement>): void {
        const fileList = e.target.files;
        if (fileList) {
          const files: File[] = Array.from(fileList);
          let tempimages = {}
          let sourceOrder = {}
          for (let i = 0; i < files.length; ++i){
            tempimages[files[i].name]={name:files[i].name}
            sourceOrder[files[i].name]=i;
          }
          console.log("temp",tempimages)
          setImages(tempimages)
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
                  console.log(p.loaded / p.total!);
                  console.log("before",images);
                  setImages((prev) => ({
                    ...prev,
                    [file.name]: { ...prev[file.name], progress: p.loaded / p.total! },
                  }));
                  console.log("after",images)
                  //this.setState({
                  //fileprogress: p.loaded / p.total
                  //})
                },
              });
            })
          ).then(data=>{ 
            setImages((prev) =>{
                let temp = {...prev}
                Object.entries(prev).forEach(([key,value]) => {
                temp[key]["url"] = data[sourceOrder[key]].data?.secure_url;
                })
              return temp;
            })
          })
        }
        
    }
    console.log(images)
    async function  handleCopy(url: any): Promise<void> {
        await navigator.clipboard.writeText(url);
        toast({
          description: "Your message has been sent.",
        });
    }

  return (
    <Card className="w-[300px] h-[80vh] sticky top-[100px] ">
      <Card className="m-2">
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
      <Card className="overflow-y-auto h-[70%]">
        {Object.entries(images)?.map(([key, value]: any, index) => (
          <CardContent key={key} className="flex items-center overflow-y-auto">
            <div className="p-3">
              {!!value?.url ? (
                <Image src={value?.url} width={100} height={75} alt="images" />
              ) : (
                <Skeleton className="w-[100px] h-[75px]" />
              )}
            </div>
            {!value?.url ? (
              <Progress value={value?.progress * 100} />
            ) : (
              <Button variant="outline" size="icon" onClick={() => handleCopy(value?.url)}>
                <CopyIcon className="h-4 w-4" />
              </Button>
            )}
          </CardContent>
        ))}
      </Card>
    </Card>
  );
}

export default UploadImages