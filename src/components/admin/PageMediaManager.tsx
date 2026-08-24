import { useState } from "react";
import { ArrowDown, ArrowUp, Eye, EyeOff, ImagePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFileUpload, validateImageFile } from "@/services/convexFileService";
import { PageKey, useAllPageMedia, useCreatePageMedia, useDeletePageMedia, useUpdatePageMedia } from "@/services/convexPageMediaService";

const pageOptions: { value: PageKey; label: string }[] = [
  { value: "breeding", label: "Развъдни котки" },
  { value: "kittens", label: "Налични котенца" },
  { value: "litters", label: "Минали котила" },
  { value: "shows", label: "Изложби" },
];

export default function PageMediaManager() {
  const [page, setPage] = useState<PageKey>("breeding");
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const media = useAllPageMedia(page);
  const { uploadFile } = useFileUpload();
  const createMedia = useCreatePageMedia();
  const updateMedia = useUpdatePageMedia();
  const deleteMedia = useDeletePageMedia();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const validation = validateImageFile(file);
    if (!validation.valid) return alert(validation.error);
    setIsUploading(true);
    try {
      const upload = await uploadFile(file, { imageType: "general" });
      if (!upload.success || !upload.url || !upload.storageId) throw new Error(upload.error || "Грешка при качването");
      await createMedia({ page, storageId: upload.storageId, url: upload.url, filename: file.name, altText: altText.trim() || file.name, caption: caption.trim() || undefined, isDisplayed: true });
      setAltText("");
      setCaption("");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Грешка при качването");
    } finally {
      setIsUploading(false);
    }
  };

  const move = async (index: number, direction: -1 | 1) => {
    if (!media) return;
    const otherIndex = index + direction;
    if (otherIndex < 0 || otherIndex >= media.length) return;
    const current = media[index];
    const other = media[otherIndex];
    await updateMedia({ id: current._id, sortOrder: other.sortOrder });
    await updateMedia({ id: other._id, sortOrder: current.sortOrder });
  };

  return <div className="h-full overflow-y-auto p-4 sm:p-6">
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div><h2 className="font-playfair text-2xl font-semibold">Изображения на страниците</h2><p className="mt-1 text-sm text-muted-foreground">Качвайте снимки към конкретна страница, без да променяте каталога с котки.</p></div>
      <Select value={page} onValueChange={(value: PageKey) => setPage(value)}><SelectTrigger className="w-full sm:w-64"><SelectValue /></SelectTrigger><SelectContent>{pageOptions.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent></Select>
    </div>
    <Card className="mb-6"><CardContent className="grid gap-4 p-5 md:grid-cols-[1fr_1fr_auto] md:items-end">
      <div className="space-y-2"><Label htmlFor="page-media-alt">Alt текст</Label><Input id="page-media-alt" value={altText} onChange={(event) => setAltText(event.target.value)} placeholder="Например: Maine Coon котка в домашна среда" /></div>
      <div className="space-y-2"><Label htmlFor="page-media-caption">Кратко описание</Label><Textarea id="page-media-caption" value={caption} onChange={(event) => setCaption(event.target.value)} placeholder="По желание" rows={1} /></div>
      <label className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80"><ImagePlus className="h-4 w-4" />{isUploading ? "Качване..." : "Качи снимка"}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="sr-only" disabled={isUploading} onChange={handleUpload} /></label>
    </CardContent></Card>
    {!media ? <p className="py-12 text-center text-muted-foreground">Зареждане...</p> : media.length === 0 ? <div className="rounded-2xl border border-dashed p-12 text-center text-muted-foreground">Все още няма снимки за тази страница.</div> : <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{media.map((item, index) => <Card key={item._id} className={!item.isDisplayed ? "opacity-60" : ""}><div className="aspect-[4/3] overflow-hidden rounded-t-xl bg-muted"><img src={item.url} alt={item.altText} className="h-full w-full object-cover" loading="lazy" /></div><CardContent className="space-y-3 p-4"><p className="truncate text-sm font-medium">{item.altText}</p>{item.caption && <p className="line-clamp-2 text-xs text-muted-foreground">{item.caption}</p>}<div className="flex flex-wrap gap-2"><Button size="sm" variant="outline" onClick={() => updateMedia({ id: item._id, isDisplayed: !item.isDisplayed })}>{item.isDisplayed ? <Eye className="mr-1 h-4 w-4" /> : <EyeOff className="mr-1 h-4 w-4" />}{item.isDisplayed ? "Скрий" : "Покажи"}</Button><Button size="icon" variant="outline" disabled={index === 0} onClick={() => move(index, -1)} aria-label="Премести нагоре"><ArrowUp className="h-4 w-4" /></Button><Button size="icon" variant="outline" disabled={index === media.length - 1} onClick={() => move(index, 1)} aria-label="Премести надолу"><ArrowDown className="h-4 w-4" /></Button><Button size="icon" variant="destructive" onClick={() => { if (confirm("Да изтрием ли тази снимка?")) deleteMedia({ id: item._id, storageId: item.storageId }); }} aria-label="Изтрий"><Trash2 className="h-4 w-4" /></Button></div></CardContent></Card>)}</div>}
  </div>;
}
