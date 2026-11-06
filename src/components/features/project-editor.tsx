"use client";
import { useId, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { validateProject } from "@/lib/validation/project";
import type { ProjectSettings, ProjectErrors } from "@/types/project";
export function ProjectEditor() {
  const id = useId();
  const [project, setProject] = useState<ProjectSettings>({
    name: "My workspace",
    description: "A clear starting point for your next idea.",
  });
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<ProjectErrors>({});
  const [message, setMessage] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = validateProject({
      name: form.get("name"),
      description: form.get("description"),
    });
    if (!result.success) {
      setErrors(result.errors);
      (result.errors.name ? nameRef : descriptionRef).current?.focus();
      return;
    }
    setProject(result.data);
    setErrors({});
    setOpen(false);
    setMessage("Project updated locally. Changes reset when you reload.");
  }
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-secondary">
          <SlidersHorizontal aria-hidden="true" className="size-5" />
        </div>
        <CardTitle>
          <h3>Make it yours</h3>
        </CardTitle>
        <CardDescription>
          A form, a dialog, and a useful place to begin.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-lg border p-4">
          <p className="font-medium" data-testid="project-name">
            {project.name}
          </p>
          <p className="mt-1 break-words text-sm text-muted-foreground">
            {project.description || "No description added."}
          </p>
        </div>
        <Dialog
          open={open}
          onOpenChange={(value) => {
            setOpen(value);
            setErrors({});
          }}
        >
          <DialogTrigger asChild>
            <Button variant="outline">
              Edit project
              <ArrowUpRight aria-hidden="true" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit project</DialogTitle>
              <DialogDescription>
                Try the local form. Nothing is saved to a server.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={submit} noValidate className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`${id}-name`}>Project name</Label>
                <Input
                  ref={nameRef}
                  id={`${id}-name`}
                  name="name"
                  defaultValue={project.name}
                  required
                  minLength={2}
                  maxLength={80}
                  aria-invalid={!!errors.name}
                  aria-describedby={
                    errors.name ? `${id}-name-error` : undefined
                  }
                />
                {errors.name && (
                  <p
                    id={`${id}-name-error`}
                    className="text-sm text-destructive"
                  >
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-description`}>Description</Label>
                <Input
                  ref={descriptionRef}
                  id={`${id}-description`}
                  name="description"
                  defaultValue={project.description}
                  maxLength={240}
                  aria-invalid={!!errors.description}
                  aria-describedby={
                    errors.description ? `${id}-description-error` : undefined
                  }
                />
                {errors.description && (
                  <p
                    id={`${id}-description-error`}
                    className="text-sm text-destructive"
                  >
                    {errors.description}
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button type="submit">
                  <Check aria-hidden="true" />
                  Save locally
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <p role="status" className="min-h-10 text-sm text-muted-foreground">
          {message}
        </p>
      </CardContent>
    </Card>
  );
}
