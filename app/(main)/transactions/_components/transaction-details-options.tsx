"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ImagePlusIcon, XIcon } from "lucide-react"

import { PageSection } from "@/components/page-shell"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type SelectedImage = {
  file: File
  id: string
  previewUrl: string
  state: "uploading" | "done"
}

const dateTimeInputClassName =
  "block box-border h-8 min-h-8 max-h-8 w-full min-w-0 max-w-full appearance-none [&::-webkit-date-and-time-value]:min-w-0 [&::-webkit-datetime-edit]:p-0"

function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.ceil(size / 1024)} KB`
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

function formatFileType(file: File) {
  return file.name.split(".").pop()?.toUpperCase() ?? "Ảnh"
}

export function TransactionDetailsOptions({
  children,
  hideDateTime = false,
}: {
  children?: React.ReactNode
  hideDateTime?: boolean
}) {
  const [images, setImages] = useState<SelectedImage[]>([])
  const dateInputRef = useRef<HTMLInputElement>(null)
  const timeInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const previewUrlsRef = useRef(new Set<string>())
  const uploadTimersRef = useRef(new Set<number>())

  useEffect(() => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const day = String(now.getDate()).padStart(2, "0")
    const hours = String(now.getHours()).padStart(2, "0")
    const minutes = String(now.getMinutes()).padStart(2, "0")

    if (dateInputRef.current) {
      dateInputRef.current.value = `${year}-${month}-${day}`
    }

    if (timeInputRef.current) {
      timeInputRef.current.value = `${hours}:${minutes}`
    }

    const previewUrls = previewUrlsRef.current
    const uploadTimers = uploadTimersRef.current

    return () => {
      previewUrls.forEach((previewUrl) => URL.revokeObjectURL(previewUrl))
      uploadTimers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

  function handleImagesChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? [])

    if (files.length === 0) return

    const selectedImages = files.map((file) => {
      const previewUrl = URL.createObjectURL(file)
      previewUrlsRef.current.add(previewUrl)

      return {
        file,
        id: crypto.randomUUID(),
        previewUrl,
        state: "uploading" as const,
      }
    })

    setImages((currentImages) => [...currentImages, ...selectedImages])

    selectedImages.forEach((image, index) => {
      const timer = window.setTimeout(() => {
        setImages((currentImages) =>
          currentImages.map((currentImage) =>
            currentImage.id === image.id
              ? { ...currentImage, state: "done" }
              : currentImage
          )
        )
        uploadTimersRef.current.delete(timer)
      }, 1000 + index * 250)

      uploadTimersRef.current.add(timer)
    })

    event.target.value = ""
  }

  function removeImage(imageId: string) {
    setImages((currentImages) => {
      const image = currentImages.find(
        (currentImage) => currentImage.id === imageId
      )

      if (image) {
        URL.revokeObjectURL(image.previewUrl)
        previewUrlsRef.current.delete(image.previewUrl)
      }

      return currentImages.filter(
        (currentImage) => currentImage.id !== imageId
      )
    })
  }

  return (
    <PageSection>
      <h2 className="font-heading text-base font-medium">
        Thông tin giao dịch
      </h2>

      <Card>
        <CardContent>
          <FieldGroup className="gap-4">
            {children}

            {!hideDateTime && (
              <div className="grid min-w-0 grid-cols-2 gap-3">
                <Field className="min-w-0">
                  <FieldLabel htmlFor="transaction-date">Ngày</FieldLabel>
                  <Input
                    ref={dateInputRef}
                    id="transaction-date"
                    name="transaction-date"
                    type="date"
                    className={dateTimeInputClassName}
                  />
                </Field>
                <Field className="min-w-0">
                  <FieldLabel htmlFor="transaction-time">Giờ</FieldLabel>
                  <Input
                    ref={timeInputRef}
                    id="transaction-time"
                    name="transaction-time"
                    type="time"
                    className={dateTimeInputClassName}
                  />
                </Field>
              </div>
            )}

            <Field>
              <FieldLabel htmlFor="transaction-note">Ghi chú</FieldLabel>
              <Textarea
                id="transaction-note"
                name="transaction-note"
                placeholder="Thêm ghi chú..."
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="transaction-images">
                Đính kèm ảnh
                <Badge>Pro</Badge>
              </FieldLabel>

              <div className="space-y-3">
                {images.length > 0 && (
                  <AttachmentGroup aria-label="Ảnh đính kèm">
                    {images.map((image) => (
                      <Attachment
                        key={image.id}
                        state={image.state}
                        orientation="vertical"
                      >
                        <AttachmentMedia variant="image">
                          <Image
                            src={image.previewUrl}
                            alt={image.file.name}
                            width={40}
                            height={40}
                            unoptimized
                          />
                        </AttachmentMedia>
                        <AttachmentContent>
                          <AttachmentTitle>{image.file.name}</AttachmentTitle>
                          <AttachmentDescription>
                            {image.state === "uploading"
                              ? "Đang tải lên..."
                              : `${formatFileType(image.file)} · ${formatFileSize(image.file.size)}`}
                          </AttachmentDescription>
                        </AttachmentContent>
                        <AttachmentActions>
                          <AttachmentAction
                            aria-label={`Xoá ${image.file.name}`}
                            onClick={() => removeImage(image.id)}
                          >
                            <XIcon />
                          </AttachmentAction>
                        </AttachmentActions>
                        <AttachmentTrigger
                          render={
                            <a
                              href={image.previewUrl}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`Mở ${image.file.name}`}
                            />
                          }
                        />
                      </Attachment>
                    ))}
                  </AttachmentGroup>
                )}

                <Attachment state="idle" className="w-full">
                  <AttachmentMedia>
                    <ImagePlusIcon />
                  </AttachmentMedia>
                  <AttachmentContent>
                    <AttachmentTitle>Thêm ảnh</AttachmentTitle>
                    <AttachmentDescription>
                      Chạm để chọn ảnh từ thiết bị
                    </AttachmentDescription>
                  </AttachmentContent>
                  <AttachmentTrigger
                    aria-label="Chọn ảnh đính kèm"
                    onClick={() => imageInputRef.current?.click()}
                  />
                </Attachment>
              </div>

              <Input
                ref={imageInputRef}
                className="sr-only"
                id="transaction-images"
                name="transaction-images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </PageSection>
  )
}
