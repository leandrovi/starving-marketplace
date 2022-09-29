import Nullstack, {
  NullstackEnvironment,
  NullstackNode,
  NullstackPage,
  NullstackParams,
  NullstackProject,
  NullstackRouter,
  NullstackSettings,
  NullstackWorker,
} from "nullstack";
// @ts-ignore
import Dropzone from "dropzone";

import { AppClientContext } from "../../../client";
import Button from "../../shared/components/Button";
import Input from "../../shared/components/Input";
import Textarea from "../../shared/components/Textarea";

declare function QuantityInput(): NullstackNode;

const dropdownConfig = {
  maxFiles: 1,
  uploadMultiple: false,
  dictDefaultMessage: "",
  init: () => {
    document
      .querySelectorAll(".dropzone .dz-default .dz-button")
      .forEach((buttonElement) => {
        buttonElement.innerHTML = `<img src="/icons/img-preview.svg" />`;
      });
  },
};

class AdminCreateNFT extends Nullstack {
  sideADropzone: Dropzone;
  sideBDropzone: Dropzone;

  sideAFile: Dropzone.DropzoneFile;
  sideAName: string;
  sideAExternalLink: string;
  maxEditions: string;
  sideADescription: string;
  taps: number;

  sideBFile: Dropzone.DropzoneFile;
  sideBName: string;
  sideBExternalLink: string;
  sideBDescription: string;

  async hydrate() {
    this.sideADropzone = new Dropzone("#dropzone-a", dropdownConfig);
    this.sideBDropzone = new Dropzone("#dropzone-b", dropdownConfig);

    this.sideADropzone.on("addedfile", (file) => {
      this.sideAFile = file;
    });

    this.sideBDropzone.on("addedfile", (file) => {
      this.sideBFile = file;
    });
  }

  async createNFT() {
    const {
      sideAFile,
      sideAName,
      sideAExternalLink,
      maxEditions,
      sideADescription,
      taps,
      sideBFile,
      sideBName,
      sideBExternalLink,
      sideBDescription,
    } = this;

    console.log({
      sideAFile,
      sideAName,
      sideAExternalLink,
      maxEditions,
      sideADescription,
      taps,
      sideBFile,
      sideBName,
      sideBExternalLink,
      sideBDescription,
    });
  }

  renderQuantityInput() {
    return (
      <div class="flex flex-col mt-8 items-start justify-center w-full">
        <label class="text-lg drop-shadow-[0_0_14px_rgba(255,255,255,0.7)] mb-1 font-light">
          Price
        </label>

        <div class="flex flex-row w-full items-center justify-between">
          <p class="font-thin text-base text-lightGray max-w-[200px] leading-[22px]">
            Will be on sale until you transfer this item or cancel it
          </p>

          <div class="flex flex-row border border-color-white">
            <div class="flex items-center justify-center px-4 py-3 border-r">
              <img src="/icons/drop.svg" class="max-w-[14px]" />
            </div>
            <div class="flex items-center justify-center">
              <input
                placeholder="1.34"
                class="max-w-[80px] bg-darkGray px-3 py-2 font-bold text-[18px] text-center"
                bind={this.taps}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <section class="px-[5.5rem] py-[6.25rem]">
        <div class="flex flex-col items-start justify-start">
          <div class="flex flex-row">
            <div class="w-[400px] mr-[117px]">
              <h2 class="text-2xl font-normal mb-3">Create a new NFT</h2>

              <strong class="text-lg font-normal mb-1 block">
                Image, Video, Audio, or 3D Model *
              </strong>

              <p class="text-sm font-light text-lightGray mb-9">
                File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
                OGG, GLB, GLTF. Max size: 100 MB
              </p>

              <div class="dropdownWrapper">
                <form action="/" class="dropzone" id="dropzone-a" />
              </div>

              <Input label="Name" required={true} bind={this.sideAName} />
              <Input label="External link" bind={this.sideAExternalLink} />
              <Input
                label="Max Editions"
                placeholder="5"
                helperText="Number of Editions that will be created"
                bind={this.maxEditions}
              />
              {/* <Textarea
                label="Description"
                rows={4}
                description="The description will be included on the item's detail page underneath its image. Markdown syntax is supported."
                bind={this.sideADescription}
              /> */}
              <QuantityInput placeholder="1.34" />

              <p class="mt-[49px] text-lg drop-shadow-[0_0_14px_rgba(255,255,255,0.7)] mb-1 font-light">
                Blockchain
              </p>
              <div class="flex flex-row items-center">
                <img class="mr-2" src="/icons/blocto.svg" />
                <p class="font-light">Blocto</p>
              </div>
            </div>

            <div class="w-[400px]">
              <h2 class="text-2xl font-normal mb-3">
                <span class="text-pink">Side B</span> - NFT for donation
              </h2>

              <strong class="text-lg font-normal mb-1 block">
                Image, Video, Audio, or 3D Model *
              </strong>

              <p class="text-sm font-light text-lightGray mb-9">
                File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
                OGG, GLB, GLTF. Max size: 100 MB
              </p>

              <div class="dropdownWrapper">
                <form action="/" class="dropzone" id="dropzone-b" />
              </div>

              <Input
                name="nameB"
                label="Name"
                required={true}
                bind={this.sideBName}
              />
              <Input
                name="externalLinkB"
                label="External link"
                bind={this.sideBExternalLink}
              />
              <Input
                name="maxEditions"
                label="Max Editions"
                placeholder="5"
                helperText="Number of Editions that will be created"
                disabled={true}
                bind={this.maxEditions}
              />
              {/* <Textarea
                name="descriptionB"
                label="Description"
                rows={4}
                description="The description will be included on the item's detail page underneath its image. Markdown syntax is supported."
                bind={this.sideBDescription}
              /> */}
              <div class="mt-6 flex items-center justify-center px-[30px] pt-[25px] pb-[43px] relative w-full border border-yellow">
                <p class="font-light text-sm text-lightGray">
                  This NFT will be generated at the same time as the original
                  and will be donated when you sell it
                </p>
                <p class="absolute bottom-[7px] right-[13px] font-light text-base text-yellow">
                  Donation
                </p>
              </div>
            </div>
          </div>

          <div class="mt-[37.13px]">
            <Button
              onclick={this.createNFT}
              disabled={
                !this.sideAFile ||
                !this.sideBFile ||
                !this.sideAName ||
                !this.sideBName
              }
            >
              Create NFT
            </Button>
          </div>
        </div>
      </section>
    );
  }
}

export default AdminCreateNFT;
