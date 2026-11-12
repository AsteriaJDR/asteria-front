import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import siteConfig from '../../../site.config.json';
import { RouteSeo } from './route-seo';

@Injectable()
export class SeoTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const seo = this.resolveSeo(snapshot);
    const title = seo?.title ?? siteConfig.siteName;
    const description = seo?.description ?? siteConfig.description;

    this.title.setTitle(title);
    this.setTag('name', 'description', description);
    this.setTag('property', 'og:title', title);
    this.setTag('property', 'og:description', description);
    this.setTag('property', 'og:type', 'website');
    this.setTag('property', 'og:site_name', siteConfig.siteName);
    this.setTag('property', 'og:locale', siteConfig.locale);
    this.setTag('name', 'twitter:card', 'summary_large_image');
    this.setTag('name', 'twitter:title', title);
    this.setTag('name', 'twitter:description', description);

    if (seo?.noindex) {
      this.setTag('name', 'robots', 'noindex');
    } else {
      this.meta.removeTag('name="robots"');
    }

    if (siteConfig.siteUrl) {
      const absoluteUrl = siteConfig.siteUrl + snapshot.url;
      this.setCanonical(absoluteUrl);
      this.setTag('property', 'og:url', absoluteUrl);
    } else {
      this.removeCanonical();
      this.meta.removeTag('property="og:url"');
    }
  }

  private resolveSeo(snapshot: RouterStateSnapshot): RouteSeo | undefined {
    let route = snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.data['seo'] as RouteSeo | undefined;
  }

  private setTag(attr: 'name' | 'property', value: string, content: string): void {
    this.meta.updateTag({ [attr]: value, content }, `${attr}="${value}"`);
  }

  private setCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private removeCanonical(): void {
    this.document.head.querySelector('link[rel="canonical"]')?.remove();
  }
}
