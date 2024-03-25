<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useValidation } from 'lost-ui'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast/use-toast'

const formElement = ref<HTMLFormElement | null>(null)

const { toast } = useToast()

const form = reactive({
  name: '',
  email: '',
  userName: '',
  framework: '',
  isFrameworkRequired: false,
  address: {
    street: '',
    city: '',
  },
})

const { errors, hasError, onUpdate, getErrorMessage, reset, validate }
  = useValidation(formElement)

// const scrollTo = useScrollToError({ offset: 40 });

async function onSubmit() {
  const valid = await validate()
  // if (!valid) return scrollTo();
  if (!valid)
    return
  toast({
    title: 'Register Success',
  })
}

function onReset() {
  formElement.value?.reset()
  reset()
}
</script>

<template>
  <Card class="w-[350px] mx-auto">
    <form ref="formElement" novalidate @submit.prevent="onSubmit">
      <CardHeader>
        <CardTitle>Registration</CardTitle>
        <CardDescription>Register user </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid items-center w-full gap-4">
          <section class="flex flex-col space-y-1.5 group">
            <Label for="name" :class="{ 'text-red-500': hasError('name') }">Name</Label>
            <Input
              id="name"
              v-model="form.name"
              name="name"
              placeholder="Name of your project"
              :class="{
                'border-red-500 bg-red-50 text-red-500': hasError('name'),
              }"
              maxlength="12"
              minlength="6"
              required
              :aria-invalid="hasError('name')"
              @input="onUpdate"
            />
            <div v-if="hasError('name')" class="text-red-500 text-xs">
              {{ getErrorMessage("name") }}
            </div>
          </section>

          <section class="flex flex-col space-y-1.5">
            <Label for="email" :class="{ 'text-red-500 ': hasError('email') }">E-mail</Label>
            <Input
              id="email"
              v-model="form.email"
              name="email"
              placeholder="E-mail"
              type="email"
              :class="{
                'border-red-500 bg-red-50 text-red-500': hasError('email'),
              }"
              :aria-invalid="hasError('email')"
              required
              @input="onUpdate"
            />
            <div v-if="hasError('email')" class="text-red-500 text-xs">
              {{ getErrorMessage("email") }}
            </div>
          </section>

          <!-- <section class="flex flex-col space-y-1.5">
            <Label
              for="user-name"
              :class="{ 'text-red-500 ': hasError('userName') }"
              >User Name</Label
            >
            <Input
              id="user-name"
              v-model="form.userName"
              placeholder="User Name"
              :class="{
                'border-red-500 bg-red-50': hasError('userName'),
              }"
              :aria-invalid="hasError('userName')"
            />
            <div v-if="hasError('userName')" class="text-red-500 text-xs">
              {{ getErrorMessage("userName") }}
            </div>
          </section> -->

          <!-- <section class="flex items-center space-x-2">
            <Switch
              id="framework-required"
              v-model:checked="form.isFrameworkRequired"
              @update:checked="onUpdate"
            >
            </Switch>
            <Label for="framework-required">Framework Requierd</Label>
          </section> -->

          <!-- <section class="flex flex-col space-y-1.5">
            <Label
              for="framework"
              :class="{ 'text-red-500': hasError('framework') }"
              >Framework</Label
            >
            <Select
              name="framework"
              v-model="form.framework"
              :required="form.isFrameworkRequired"
              @update:model-value="onUpdate"
            >
              <SelectTrigger
                id="framework"
                :class="{
                  'border-red-500 bg-red-50': hasError('framework'),
                }"
                :aria-invalid="hasError('framework')"
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="nuxt"> Nuxt.js </SelectItem>
                <SelectItem value="next"> Next.js </SelectItem>
                <SelectItem value="sveltekit"> SvelteKit </SelectItem>
                <SelectItem value="astro"> Astro </SelectItem>
              </SelectContent>
            </Select>
            <div v-if="hasError('framework')" class="text-red-500 text-xs">
              {{ getErrorMessage("framework") }}
            </div>
          </section> -->

          <h2 class="text-md font-bold">
            Address
          </h2>
          <section class="flex flex-col space-y-1.5">
            <Label
              for="street"
              :class="{ 'text-red-500 ': hasError('address.street') }"
            >Street</Label>
            <Input
              id="street"
              v-model="form.address.street"
              name="address.street"
              placeholder="Street"
              :class="{
                'border-red-500 bg-red-50': hasError('address.street'),
              }"
              :aria-invalid="hasError('address.street')"
              required
              @input="onUpdate"
            />
            <div v-if="hasError('address.street')" class="text-red-500 text-xs">
              {{ getErrorMessage("address.street") }}
            </div>
          </section>

          <section class="flex flex-col space-y-1.5">
            <Label
              for="city"
              :class="{ 'text-red-500 ': hasError('address.city') }"
            >City</Label>
            <Input
              id="city"
              v-model="form.address.city"
              name="address.city"
              placeholder="City"
              :class="{ 'border-red-500 bg-red-50': hasError('address.city') }"
              :aria-invalid="hasError('address.city')"
              required
              @input="onUpdate"
            />
            <div v-if="hasError('address.city')" class="text-red-500 text-xs">
              {{ getErrorMessage("address.city") }}
            </div>
          </section>
        </div>
      </CardContent>
      <CardFooter class="flex justify-between px-6 pb-6">
        <Button type="button" variant="outline" @click="onReset">
          Reset
        </Button>
        <Button type="submit">
          Register
        </Button>
      </CardFooter>
    </form>
  </Card>
  <!-- <pre>{{ form }}</pre> -->
  <pre>{{ errors }}</pre>
</template>
