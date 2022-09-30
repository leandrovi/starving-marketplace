import Nullstack, { NullstackNode } from "nullstack";
import { Web3Storage } from "web3.storage";
import * as fcl from "@onflow/fcl";

// @ts-ignore
import Dropzone from "dropzone";

const MINT_NFT: string = require("../../../cadence/transactions/MintStarvingChildrenNFT.cdc");

import { AppClientContext } from "../../../client";
import Button from "../../shared/Button";
import Input from "../../shared/Input";
import { NFTModel } from "../../models/NFTModel";
import { NFT } from "../../appTypes/types";

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
  isLoading = false;
  mintComplete = false;
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

  static async getWeb3StorageToken({ secrets }) {
    return secrets.web3StorageToken;
  }

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

  static async postNFT({ data }) {
    return await NFTModel.create(data);
  }

  async mintNFT(context: AppClientContext<{ nftData: Partial<NFT> }>) {
    const {
      nftData: { name, description, fileCID },
      adminUser: { addr },
    } = context;

    const addressWithoutPrefix = addr.substring(2);

    try {
      const transactionId = await fcl.mutate({
        cadence: MINT_NFT,
        args: (arg, t) => [
          arg(addr, t.Address),
          arg(name, t.String),
          arg(description, t.String),
          arg(fileCID, t.String),
        ],
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorizations: [fcl.currentUser],
        limit: 100,
      });

      const { events } = await fcl.tx(transactionId).onceSealed();
      const { data: eventData } = events.find(
        (event) => event.type === `A.${addressWithoutPrefix}.StarvingNFT.Minted`
      );
      const nftId = eventData.id as string;

      return {
        identification: nftId,
        ...context.nftData,
      };
    } catch (err) {
      console.log({ err });
    }
  }

  async createNFT() {
    this.isLoading = true;

    try {
      // @ts-ignore
      const web3StorageToken = await this.getWeb3StorageToken();
      const web3StorageClient = new Web3Storage({ token: web3StorageToken });

      const [sideAFileCid, sideBFileCid] = await Promise.all([
        web3StorageClient.put([this.sideAFile], {
          name: this.sideAFile.name,
        }),
        web3StorageClient.put([this.sideBFile], {
          name: this.sideBFile.name,
        }),
      ]);

      const sideA = await this.mintNFT({
        nftData: {
          name: this.sideAName,
          description: this.sideADescription ?? "",
          fileCID: sideAFileCid,
          fileName: this.sideAFile.name,
          price: this.taps,
          isDonation: false,
        },
      } as AppClientContext<{ nftData: Partial<NFT> }>);

      const sideB = await this.mintNFT({
        nftData: {
          name: this.sideBName,
          description: this.sideBDescription ?? "",
          fileCID: sideBFileCid,
          fileName: this.sideBFile.name,
          price: this.taps,
          isDonation: true,
        },
      } as AppClientContext<{ nftData: Partial<NFT> }>);

      console.log({ sideA, sideB });

      await Promise.all([
        // @ts-ignore
        this.postNFT({ data: sideA }),
        // @ts-ignore
        this.postNFT({ data: sideB }),
      ]);
    } catch (err) {
      console.log({ err });
    } finally {
      this.isLoading = false;
      this.mintComplete = true;

      setTimeout(() => {
        this.mintComplete = false;
      }, 3000);
    }
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
                <form action="/files" class="dropzone" id="dropzone-a" />
              </div>

              <Input label="Name" required={true} bind={this.sideAName} />
              <Input label="External link" bind={this.sideAExternalLink} />
              <Input
                label="Max Editions"
                placeholder="5"
                helperText="Number of Editions that will be created"
                bind={this.maxEditions}
              />
              <Input
                label="Description"
                rows={4}
                description="The description will be included on the item's detail page underneath its image. Markdown syntax is supported."
                bind={this.sideADescription}
              />
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
                <form action="/files" class="dropzone" id="dropzone-b" />
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
              <Input
                name="descriptionB"
                label="Description"
                rows={4}
                description="The description will be included on the item's detail page underneath its image. Markdown syntax is supported."
                bind={this.sideBDescription}
              />
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

          <div class="mt-[37.13px] flex items-center justify-center">
            <Button
              isLoading={this.isLoading}
              onclick={this.createNFT}
              disabled={
                !this.sideAFile ||
                !this.sideBFile ||
                !this.sideAName ||
                !this.sideBName ||
                !this.taps
              }
            >
              Create NFT
            </Button>
            {this.mintComplete && (
              <p class="font-thin max-w-[200px] ml-6">
                🎉 Congrats! You have just create two NFTs, way to go!
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default AdminCreateNFT;
